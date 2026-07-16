import { API_PROXY_BASE, MEDIA_CACHE_TTL } from "./config.js";

const STORAGE_PREFIX = "cynex-media-v3:";
const memory = new Map();
const inflight = new Map();
const debug = globalThis.location?.hostname === "localhost" || globalThis.location?.hostname === "127.0.0.1";
const remoteRequestsAllowed = globalThis.location?.protocol !== "file:" || Boolean(API_PROXY_BASE);

function log(message, error) {
  if (debug) console.warn(`[Cynex media] ${message}`, error ?? "");
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
  if (!remoteRequestsAllowed) throw new Error("Remote media refresh is disabled for file:// previews");
  try {
    return await fetchJson(directUrl);
  } catch (directError) {
    const proxied = proxyUrl(proxyPath, proxyParams);
    if (!proxied) throw directError;
    log("Direct request failed; trying configured proxy", directError);
    return fetchJson(proxied);
  }
}

function batchesOf(items, size = 50) {
  const batches = [];
  for (let index = 0; index < items.length; index += size) batches.push(items.slice(index, index + size));
  return batches;
}

function thumbnailValue(item) {
  const state = item?.state ?? "Missing";
  return {
    state,
    imageUrl: state === "Completed" && item?.imageUrl ? item.imageUrl : null,
    reason: String(state).toLowerCase(),
  };
}

export async function resolveUniverseId(game) {
  if (game.universeId && /^\d+$/.test(String(game.universeId))) return String(game.universeId);
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

async function requestPlaceIcons(entries, results) {
  for (const batch of batchesOf(entries)) {
    const ids = [...new Set(batch.map(({ game }) => game.id))].join(",");
    const params = new URLSearchParams({
      placeIds: ids,
      returnPolicy: "PlaceHolder",
      size: "512x512",
      format: "WebP",
      isCircular: "false",
    });
    const direct = `https://thumbnails.roblox.com/v1/places/gameicons?${params}`;
    const payload = await withProxyFallback(direct, "/api/roblox/place-icons", { placeIds: ids });
    const byTarget = new Map((payload?.data ?? []).map(item => [String(item.targetId), item]));
    batch.forEach(entry => {
      const value = thumbnailValue(byTarget.get(entry.game.id));
      results.set(entry.game.id, value);
      cacheWrite(entry.cacheKey, value, MEDIA_CACHE_TTL.robloxThumbnail);
    });
  }
}

async function requestUniverseIcons(entries, results) {
  const resolved = [];
  await Promise.all(entries.map(async entry => {
    try {
      resolved.push({ ...entry, universeId: await resolveUniverseId(entry.game) });
    } catch (error) {
      const value = { state: "Error", imageUrl: null, reason: "invalid-or-unavailable-id" };
      results.set(entry.game.id, value);
      cacheWrite(entry.cacheKey, value, Math.min(MEDIA_CACHE_TTL.robloxThumbnail, 5 * 60 * 1000));
      log(`Universe resolution failed for ${entry.game.name}`, error);
    }
  }));

  for (const batch of batchesOf(resolved)) {
    const ids = [...new Set(batch.map(item => item.universeId))].join(",");
    const params = new URLSearchParams({
      universeIds: ids,
      returnPolicy: "PlaceHolder",
      size: "512x512",
      format: "WebP",
      isCircular: "false",
    });
    const direct = `https://thumbnails.roblox.com/v1/games/icons?${params}`;
    try {
      const payload = await withProxyFallback(direct, "/api/roblox/thumbnails", { universeIds: ids });
      const byTarget = new Map((payload?.data ?? []).map(item => [String(item.targetId), item]));
      batch.forEach(entry => {
        const value = thumbnailValue(byTarget.get(entry.universeId));
        results.set(entry.game.id, value);
        cacheWrite(entry.cacheKey, value, MEDIA_CACHE_TTL.robloxThumbnail);
      });
    } catch (error) {
      log("Roblox universe icon batch failed", error);
      batch.forEach(entry => {
        const value = { state: "Error", imageUrl: null, reason: "request-failed" };
        results.set(entry.game.id, value);
        cacheWrite(entry.cacheKey, value, 2 * 60 * 1000);
      });
    }
  }
}

export async function getRobloxGameImages(games) {
  const results = new Map();
  const pendingPlaces = [];
  const pendingUniverses = [];

  for (const game of games) {
    const cacheKey = `game-image:${game.idType}:${game.id}`;
    const cached = cacheRead(cacheKey);
    if (cached) {
      results.set(game.id, cached);
      continue;
    }
    const entry = { game, cacheKey };
    if (game.idType === "place") pendingPlaces.push(entry);
    else if (game.idType === "universe") pendingUniverses.push(entry);
    else results.set(game.id, { state: "Error", imageUrl: null, reason: "invalid-id-type" });
  }

  if (pendingPlaces.length) {
    try {
      await requestPlaceIcons(pendingPlaces, results);
      const needsUniverseFallback = pendingPlaces.filter(entry => {
        const value = results.get(entry.game.id);
        return !value?.imageUrl && (value?.state === "Missing" || value?.state === "Error");
      });
      if (needsUniverseFallback.length) await requestUniverseIcons(needsUniverseFallback, results);
    } catch (error) {
      log("Roblox place icon request failed; trying universe lookup", error);
      await requestUniverseIcons(pendingPlaces, results);
    }
  }

  if (pendingUniverses.length) await requestUniverseIcons(pendingUniverses, results);
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

  for (const batch of batchesOf(pending)) {
    const ids = batch.map(item => item.group.groupId).join(",");
    const params = new URLSearchParams({ groupIds: ids, size: "150x150", format: "WebP", isCircular: "false" });
    const direct = `https://thumbnails.roblox.com/v1/groups/icons?${params}`;

    try {
      const payload = await withProxyFallback(direct, "/api/roblox/groups", { groupIds: ids });
      const byTarget = new Map((payload?.data ?? []).map(item => [String(item.targetId), item]));
      batch.forEach(({ group, key }) => {
        const value = thumbnailValue(byTarget.get(group.groupId));
        results.set(group.groupId, value);
        cacheWrite(key, value, MEDIA_CACHE_TTL.robloxGroup);
      });
    } catch (error) {
      log("Roblox group icon request failed", error);
      batch.forEach(({ group }) => results.set(group.groupId, { state: "Error", imageUrl: null, reason: "request-failed" }));
    }
  }
  return results;
}

export function buildDiscordIconUrl(guildId, iconHash) {
  if (!guildId || !iconHash) return null;
  return `https://cdn.discordapp.com/icons/${guildId}/${iconHash}.webp?size=256`;
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
