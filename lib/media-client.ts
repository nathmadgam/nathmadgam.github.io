"use client";

const CACHE_PREFIX = "cynex-media-v4:";
const CACHE_TTL = 24 * 60 * 60 * 1000;
const REQUEST_TIMEOUT = 8_000;
const inflight = new Map<string, Promise<string | null>>();

interface CacheEntry {
  expiresAt: number;
  imageUrl: string | null;
}

function readCache(key: string): string | null | undefined {
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!raw) return undefined;
    const entry = JSON.parse(raw) as CacheEntry;
    if (entry.expiresAt < Date.now()) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return undefined;
    }
    return entry.imageUrl;
  } catch {
    return undefined;
  }
}

function writeCache(key: string, imageUrl: string | null): void {
  try {
    const entry: CacheEntry = { imageUrl, expiresAt: Date.now() + CACHE_TTL };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
  } catch {
    // Storage may be unavailable in private browsing. The local fallback still works.
  }
}

async function fetchJson<T>(url: string, attempt = 0): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      mode: "cors",
      signal: controller.signal,
    });

    if ((response.status === 429 || response.status >= 500) && attempt < 2) {
      const retryAfter = Number(response.headers.get("Retry-After"));
      const delay = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1_000
        : 650 * (attempt + 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchJson<T>(url, attempt + 1);
    }

    if (!response.ok) throw new Error(`Media request returned ${response.status}`);
    return response.json() as Promise<T>;
  } finally {
    clearTimeout(timeout);
  }
}

function cachedRequest(key: string, request: () => Promise<string | null>): Promise<string | null> {
  const cached = readCache(key);
  if (cached !== undefined) return Promise.resolve(cached);

  const existing = inflight.get(key);
  if (existing) return existing;

  const pending = request()
    .then((imageUrl) => {
      writeCache(key, imageUrl);
      return imageUrl;
    })
    .catch((error: unknown) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[media] ${key} could not be refreshed; using local artwork.`, error);
      }
      return null;
    })
    .finally(() => inflight.delete(key));

  inflight.set(key, pending);
  return pending;
}

function proxyUrl(path: string, params: URLSearchParams): string | null {
  const proxyBase = process.env.NEXT_PUBLIC_MEDIA_PROXY_BASE?.replace(/\/$/, "");
  return proxyBase ? `${proxyBase}${path}?${params.toString()}` : null;
}

export function resolveRobloxGameThumbnail(placeId: string, suppliedUniverseId?: string): Promise<string | null> {
  const key = `roblox-game:${placeId}:${suppliedUniverseId ?? "auto"}`;
  return cachedRequest(key, async () => {
    const params = new URLSearchParams({ placeId });
    if (suppliedUniverseId) params.set("universeId", suppliedUniverseId);
    const proxy = proxyUrl("/api/roblox/thumbnail", params);
    if (proxy) {
      const result = await fetchJson<{ imageUrl?: string | null }>(proxy);
      return result.imageUrl ?? null;
    }

    let universeId = suppliedUniverseId;
    if (!universeId) {
      const universe = await fetchJson<{ universeId?: number }>(
        `https://apis.roblox.com/universes/v1/places/${encodeURIComponent(placeId)}/universe`,
      );
      universeId = universe.universeId ? String(universe.universeId) : undefined;
    }
    if (!universeId) return null;

    const result = await fetchJson<{ data?: Array<{ imageUrl?: string; state?: string }> }>(
      `https://thumbnails.roblox.com/v1/games/icons?universeIds=${encodeURIComponent(universeId)}&returnPolicy=PlaceHolder&size=512x512&format=WebP&isCircular=false`,
    );
    const thumbnail = result.data?.[0];
    return thumbnail?.state === "Completed" ? thumbnail.imageUrl ?? null : null;
  });
}

export function resolveRobloxGroupIcon(groupId: string): Promise<string | null> {
  const key = `roblox-group:${groupId}`;
  return cachedRequest(key, async () => {
    const params = new URLSearchParams({ groupId });
    const proxy = proxyUrl("/api/roblox/thumbnail", params);
    if (proxy) {
      const result = await fetchJson<{ imageUrl?: string | null }>(proxy);
      return result.imageUrl ?? null;
    }

    const result = await fetchJson<{ data?: Array<{ imageUrl?: string; state?: string }> }>(
      `https://thumbnails.roblox.com/v1/groups/icons?groupIds=${encodeURIComponent(groupId)}&size=420x420&format=WebP&isCircular=false`,
    );
    const thumbnail = result.data?.[0];
    return thumbnail?.state === "Completed" ? thumbnail.imageUrl ?? null : null;
  });
}

export function resolveDiscordIcon(inviteCode: string): Promise<string | null> {
  const key = `discord-invite:${inviteCode}`;
  return cachedRequest(key, async () => {
    const params = new URLSearchParams({ inviteCode });
    const proxy = proxyUrl("/api/discord/icon", params);
    if (proxy) {
      const result = await fetchJson<{ imageUrl?: string | null }>(proxy);
      return result.imageUrl ?? null;
    }

    const invite = await fetchJson<{ guild?: { id?: string; icon?: string } }>(
      `https://discord.com/api/v10/invites/${encodeURIComponent(inviteCode)}?with_counts=true`,
    );
    const guild = invite.guild;
    if (!guild?.id || !guild.icon) return null;
    const extension = guild.icon.startsWith("a_") ? "gif" : "webp";
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${extension}?size=256`;
  });
}
