import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { games, robloxGroups, discordServers } from "../assets/js/data.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cacheDir = path.join(root, "assets/cached-media");
const strict = process.env.CYNEX_MEDIA_STRICT === "1";
const manifest = { generatedAt: new Date().toISOString(), games: {}, groups: {}, discord: {} };

await mkdir(cacheDir, { recursive: true });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          Accept: options.accept ?? "application/json",
          "User-Agent": "Cynex-Portfolio-Media-Cache/1.0",
          ...(options.headers ?? {}),
        },
      });
      clearTimeout(timer);
      if (response.ok) return response;
      const retryable = response.status === 429 || response.status >= 500;
      if (!retryable || attempt === attempts) throw new Error(`HTTP ${response.status} ${url}`);
      const retryAfter = Number(response.headers.get("retry-after"));
      await sleep(Number.isFinite(retryAfter) ? Math.min(retryAfter * 1000, 5000) : attempt * 600);
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
      if (attempt === attempts) throw error;
      await sleep(attempt * 600);
    }
  }
  throw lastError;
}

async function json(url) {
  return (await fetchWithRetry(url)).json();
}

async function saveImage(url, relativePath) {
  const response = await fetchWithRetry(url, { accept: "image/avif,image/webp,image/*,*/*" });
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength < 100) throw new Error(`Image response was unexpectedly small: ${url}`);
  const target = path.join(root, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, bytes);
  return { path: relativePath, bytes: bytes.byteLength, source: url };
}

function thumbnailResult(payload, targetId) {
  return (payload?.data ?? []).find(item => String(item.targetId) === String(targetId));
}

async function resolveUniverseId(game) {
  if (game.universeId) return String(game.universeId);
  if (game.idType === "universe") return String(game.id);
  const payload = await json(`https://apis.roblox.com/universes/v1/places/${encodeURIComponent(game.id)}/universe`);
  if (!payload?.universeId) throw new Error(`No universe ID returned for place ${game.id}`);
  return String(payload.universeId);
}

async function cacheGame(game) {
  const local = game.cachedImage;
  if (!local) throw new Error(`${game.name} has no cachedImage path`);
  let item;
  if (game.idType === "place") {
    const params = new URLSearchParams({ placeIds: String(game.id), returnPolicy: "PlaceHolder", size: "512x512", format: "WebP", isCircular: "false" });
    const payload = await json(`https://thumbnails.roblox.com/v1/places/gameicons?${params}`);
    item = thumbnailResult(payload, game.id);
  }
  if (!item?.imageUrl || item.state !== "Completed") {
    const universeId = await resolveUniverseId(game);
    const params = new URLSearchParams({ universeIds: universeId, returnPolicy: "PlaceHolder", size: "512x512", format: "WebP", isCircular: "false" });
    const payload = await json(`https://thumbnails.roblox.com/v1/games/icons?${params}`);
    item = thumbnailResult(payload, universeId);
  }
  if (!item?.imageUrl || item.state !== "Completed") throw new Error(`Roblox thumbnail state for ${game.name}: ${item?.state ?? "Missing"}`);
  manifest.games[game.id] = await saveImage(item.imageUrl, local);
}

async function cacheGroup(group) {
  const local = group.cachedImage ?? `assets/cached-media/${group.cacheName ?? `group-${group.groupId}.webp`}`;
  const params = new URLSearchParams({ groupIds: String(group.groupId), size: "150x150", format: "WebP", isCircular: "false" });
  const payload = await json(`https://thumbnails.roblox.com/v1/groups/icons?${params}`);
  const item = thumbnailResult(payload, group.groupId);
  if (!item?.imageUrl || item.state !== "Completed") throw new Error(`Roblox group icon state for ${group.name}: ${item?.state ?? "Missing"}`);
  manifest.groups[group.groupId] = await saveImage(item.imageUrl, local);
}

function discordIconUrl(guildId, iconHash) {
  if (!guildId || !iconHash) return null;
  return `https://cdn.discordapp.com/icons/${guildId}/${iconHash}.webp?size=256`;
}

async function cacheDiscord(server) {
  const payload = await json(`https://discord.com/api/v10/invites/${encodeURIComponent(server.inviteCode)}?with_counts=true`);
  const guild = payload?.guild;
  const guildId = String(guild?.id ?? "");
  const iconHash = guild?.icon ?? null;
  const iconUrl = discordIconUrl(guildId, iconHash);
  if (!/^\d+$/.test(guildId)) throw new Error(`No guild ID returned for ${server.name}`);
  if (!iconUrl) throw new Error(`${server.name} has no Discord server icon`);
  const local = server.cachedImage ?? `assets/cached-media/${server.cacheName ?? `discord-${guildId}.webp`}`;
  manifest.discord[server.inviteCode] = {
    ...(await saveImage(iconUrl, local)),
    guildId,
    iconHash,
    memberCount: payload.approximate_member_count ?? null,
  };
}

async function run(label, items, task) {
  for (const item of items) {
    try {
      await task(item);
      console.log(`Cached ${label}: ${item.name}`);
    } catch (error) {
      console.warn(`Could not refresh ${label} ${item.name}; existing local image remains.`, error.message);
      manifest[label][item.id ?? item.groupId ?? item.inviteCode ?? item.name] = { error: error.message };
      if (strict) throw error;
    }
  }
}

await run("games", games, cacheGame);
await run("groups", robloxGroups, cacheGroup);
await run("discord", discordServers, cacheDiscord);
await writeFile(path.join(cacheDir, "media-manifest.json"), JSON.stringify(manifest, null, 2));
console.log("Media cache refresh complete.");
