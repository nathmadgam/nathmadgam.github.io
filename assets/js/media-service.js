import { API_PROXY_BASE, MEDIA_CACHE_TTL } from "./config.js";

const inflight = new Map();
const memory = new Map();
const STORAGE_PREFIX = "cynex-media-v2:";
const DEV = typeof location !== "undefined" && (location.hostname === "localhost" || location.hostname === "127.0.0.1");

function log(message, detail) {
  if (DEV) console.warn(`[media] ${message}`, detail ?? "");
}

function cacheRead(key) {
  if (memory.has(key)) return memory.get(key);
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const item = JSON.parse(raw);
    if (!item?.expiresAt || item.expiresAt <= Date.now()) {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return null;
    }
    memory.set(key, item.value);
    return item.value;
  } catch (error) {
    log("Cache read failed", error);
    return null;
  }
}

function cacheWrite(key, value, ttl) {
  memory.set(key, value);
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify({ value, expiresAt: Date.now() + ttl }));
  } catch (error) {
    log("Cache write skipped", error);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchJson(url, { retries = 2, timeout = 8000, headers = {} } = {}) {
  if (inflight.has(url)) return inflight.get(url);

  const task = (async () => {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      try {
        const response = await fetch(url, {
          headers: { Accept: "application/json", ...headers },
          signal: controller.signal,
          credentials: "omit",
        });
        clearTimeout(timer);

        if (response.ok) return await response.json();

        const retryAfter = Number(response.headers.get("retry-after"));
        const retryable = response.status === 429 || response.status >= 500;
        if (!retryable || attempt === retries) {
          throw new Error(`HTTP ${response.status} for ${new URL(url).hostname}`);
        }
        await delay(Number.isFinite(retryAfter) ? Math.min(retryAfter * 1000, 5000) : 450 * (attempt + 1));
      } catch (error) {
        clearTimeout(timer);
        lastError = error;
        if (attempt === retries) throw error;
        await delay(350 * (attempt + 1));
      }
    }
    throw lastError;
  })().finally(() => inflight.delete(url));

  inflight.set(url, task);
  return task;
}

function proxyUrl(path, params) {
  if (!API_PROXY_BASE) return null;
  const url = new URL(path, API_PROXY_BASE.endsWith("/") ? API_PROXY_BASE : `${API_PROXY_BASE}/`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
  });
  return url.toString();
}

async function withProxyFallback(directUrl, proxyPath, proxyParams) {
  try {
    return await fetchJson(directUrl);
  } catch (directError) {
    const proxied = proxyUrl(proxyPath, proxyParams);
    if (!proxied) throw directError;
    log("Direct request failed; trying configured proxy", directError);
    return fetchJson(proxied);
  }
}

export async function resolveUniverseId(game) {
  if (game.idType === "universe") return game.id;
  if (game.idType !== "place") throw new Error(`Unsupported Roblox ID type: ${game.idType}`);

  const key = `universe:${game.id}`;
  const cached = cacheRead(key);
  if (cached) return cached;

  const direct = `https://apis.roblox.com/universes/v1/places/${encodeURIComponent(game.id)}/universe`;
  const payload = await withProxyFallback(direct, "/api/roblox/universe", { placeId: game.id });
  const universeId = String(payload?.universeId ?? "");
  if (!/^\d+$/.test(universeId)) throw new Error(`No universe found for place ${game.id}`);

  cacheWrite(key, universeId, MEDIA_CACHE_TTL.universe);
  return universeId;
}

export async function getRobloxGameImages(games) {
  const results = new Map();
  const unresolved = [];

  await Promise.all(games.map(async game => {
    const cacheKey = `game-image:${game.idType}:${game.id}`;
    const cached = cacheRead(cacheKey);
    if (cached) {
      results.set(game.id, cached);
      return;
    }
    try {
      const universeId = await resolveUniverseId(game);
      unresolved.push({ game, universeId, cacheKey });
    } catch (error) {
      results.set(game.id, { state: "Error", imageUrl: null, reason: "invalid-or-unavailable-id" });
      log(`Universe resolution failed for ${game.name}`, error);
    }
  }));

  const batches = [];
  for (let index = 0; index < unresolved.length; index += 50) batches.push(unresolved.slice(index, index + 50));

  for (const batch of batches) {
    const ids = [...new Set(batch.map(item => item.universeId))].join(",");
    const params = new URLSearchParams({
      universeIds: ids,
      returnPolicy: "PlaceHolder",
      size: "512x512",
      format: "Webp",
      isCircular: "false",
    });
    const direct = `https://thumbnails.roblox.com/v1/games/icons?${params}`;

    try {
      const payload = await withProxyFallback(direct, "/api/roblox/thumbnails", { universeIds: ids });
      const byTarget = new Map((payload?.data ?? []).map(item => [String(item.targetId), item]));
      for (const entry of batch) {
        const item = byTarget.get(entry.universeId);
        const value = {
          state: item?.state ?? "Missing",
          imageUrl: item?.state === "Completed" && item?.imageUrl ? item.imageUrl : null,
          reason: item?.state ? item.state.toLowerCase() : "missing",
        };
        results.set(entry.game.id, value);
        cacheWrite(entry.cacheKey, value, MEDIA_CACHE_TTL.robloxThumbnail);
      }
    } catch (error) {
      log("Roblox game thumbnail batch failed", error);
      batch.forEach(entry => results.set(entry.game.id, { state: "Error", imageUrl: null, reason: "request-failed" }));
    }
  }

  return results;
}

export async function getRobloxGroupImages(groups) {
  const results = new Map();
  const pending = [];
  for (const group of groups) {
    const key = `group-image:${group.groupId}`;
    const cached = cacheRead(key);
    if (cached) results.set(group.groupId, cached);
    else pending.push({ group, key });
  }
  if (!pending.length) return results;

  const ids = pending.map(item => item.group.groupId).join(",");
  const params = new URLSearchParams({ groupIds: ids, size: "150x150", format: "Webp", isCircular: "false" });
  const direct = `https://thumbnails.roblox.com/v1/groups/icons?${params}`;

  try {
    const payload = await withProxyFallback(direct, "/api/roblox/groups", { groupIds: ids });
    const byTarget = new Map((payload?.data ?? []).map(item => [String(item.targetId), item]));
    pending.forEach(({ group, key }) => {
      const item = byTarget.get(group.groupId);
      const value = { state: item?.state ?? "Missing", imageUrl: item?.state === "Completed" ? item.imageUrl : null };
      results.set(group.groupId, value);
      cacheWrite(key, value, MEDIA_CACHE_TTL.robloxGroup);
    });
  } catch (error) {
    log("Roblox group icon request failed", error);
    pending.forEach(({ group }) => results.set(group.groupId, { state: "Error", imageUrl: null }));
  }
  return results;
}

export function buildDiscordIconUrl(guildId, iconHash) {
  if (!guildId || !iconHash) return null;
  const extension = iconHash.startsWith("a_") ? "gif" : "webp";
  return `https://cdn.discordapp.com/icons/${guildId}/${iconHash}.${extension}?size=256`;
}

export async function getDiscordServer(server) {
  const key = `discord:${server.inviteCode}:${server.guildId ?? "auto"}`;
  const cached = cacheRead(key);
  if (cached) return cached;

  if (server.guildId && server.iconHash) {
    const configured = {
      guildId: server.guildId,
      iconHash: server.iconHash,
      name: server.name,
      iconUrl: buildDiscordIconUrl(server.guildId, server.iconHash),
      source: "configured",
    };
    cacheWrite(key, configured, MEDIA_CACHE_TTL.discord);
    return configured;
  }

  const direct = `https://discord.com/api/v10/invites/${encodeURIComponent(server.inviteCode)}?with_counts=true`;
  let payload;
  try {
    payload = await withProxyFallback(direct, "/api/discord/invite", {
      code: server.inviteCode,
      guildId: server.guildId,
    });
  } catch (error) {
    log(`Discord metadata failed for ${server.name}`, error);
    throw error;
  }

  const guild = payload?.guild ?? payload;
  const guildId = String(guild?.id ?? guild?.guildId ?? "");
  const iconHash = guild?.icon ?? guild?.iconHash ?? null;
  if (!/^\d+$/.test(guildId)) throw new Error(`Discord response did not contain a guild ID for ${server.name}`);

  const result = {
    guildId,
    iconHash,
    name: guild?.name ?? server.name,
    memberCount: payload?.approximate_member_count ?? payload?.memberCount ?? null,
    presenceCount: payload?.approximate_presence_count ?? payload?.presenceCount ?? null,
    iconUrl: buildDiscordIconUrl(guildId, iconHash),
    source: payload?.source ?? "invite",
  };
  cacheWrite(key, result, MEDIA_CACHE_TTL.discord);
  return result;
}

export async function loadImageSafely(img, preferredUrl, fallbackUrl, shell) {
  const load = url => new Promise((resolve, reject) => {
    if (!url) return reject(new Error("Missing URL"));
    const candidate = new Image();
    candidate.decoding = "async";
    candidate.onload = () => resolve(url);
    candidate.onerror = () => reject(new Error("Image request failed"));
    candidate.src = url;
  });

  const useFallback = async () => {
    if (!fallbackUrl) {
      shell.dataset.state = "error";
      return "error";
    }
    try {
      if (!img.getAttribute("src")) img.src = fallbackUrl;
      if (!img.complete || !img.naturalWidth) await load(fallbackUrl);
      img.src = fallbackUrl;
      shell.dataset.state = "fallback";
      return "fallback";
    } catch (error) {
      shell.dataset.state = "error";
      log("Local fallback image failed", error);
      return "error";
    }
  };

  if (!img.getAttribute("src") && fallbackUrl) img.src = fallbackUrl;
  shell.dataset.state = fallbackUrl ? "fallback" : "loading";

  if (!preferredUrl) return useFallback();

  try {
    const resolvedUrl = await load(preferredUrl);
    img.src = resolvedUrl;
    shell.dataset.state = "loaded";
    return "loaded";
  } catch (error) {
    log("Preferred image failed; keeping local fallback", error);
    return useFallback();
  }
}
