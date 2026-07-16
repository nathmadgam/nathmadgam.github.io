const ROBLOX_UNIVERSE = "https://apis.roblox.com/universes/v1/places";
const ROBLOX_THUMBNAILS = "https://thumbnails.roblox.com/v1";
const DISCORD_API = "https://discord.com/api/v10";

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };
const USER_AGENT = "CynexPortfolioMediaProxy/1.0";

function corsHeaders(env, request) {
  const requested = request.headers.get("origin");
  const allowed = env.ALLOWED_ORIGIN?.trim() || "*";
  const origin = allowed === "*" || requested === allowed ? allowed === "*" ? "*" : requested : "null";
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

function json(data, status, env, request, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, ...corsHeaders(env, request), ...extra },
  });
}

function isSnowflake(value) {
  return /^\d{5,20}$/.test(value || "");
}

function parseIdList(value, max = 50) {
  const ids = [...new Set((value || "").split(",").map(id => id.trim()).filter(isSnowflake))];
  return ids.length && ids.length <= max ? ids : null;
}

function safeInviteCode(value) {
  return /^[A-Za-z0-9_-]{2,32}$/.test(value || "") ? value : null;
}

async function upstreamJson(url, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: { accept: "application/json", "user-agent": USER_AGENT, ...(init.headers || {}) },
  });
  const body = await response.text();
  let payload = null;
  try { payload = body ? JSON.parse(body) : null; } catch { payload = null; }
  return { response, payload };
}

async function cached(request, env, ctx, ttl, handler) {
  const cache = caches.default;
  const key = new Request(request.url, { method: "GET" });
  const hit = await cache.match(key);
  if (hit) return new Response(hit.body, { status: hit.status, headers: { ...Object.fromEntries(hit.headers), ...corsHeaders(env, request) } });
  const response = await handler();
  if (response.ok) {
    const copy = new Response(response.body, response);
    copy.headers.set("cache-control", `public, max-age=${ttl}`);
    ctx.waitUntil(cache.put(key, copy.clone()));
    return copy;
  }
  return response;
}

async function robloxUniverse(url, env, request) {
  const placeId = url.searchParams.get("placeId");
  if (!isSnowflake(placeId)) return json({ error: "invalid_place_id" }, 400, env, request);
  const { response, payload } = await upstreamJson(`${ROBLOX_UNIVERSE}/${placeId}/universe`);
  if (!response.ok || !isSnowflake(String(payload?.universeId || ""))) {
    return json({ error: response.status === 429 ? "rate_limited" : "universe_unavailable" }, response.status === 429 ? 429 : 404, env, request, { "retry-after": response.headers.get("retry-after") || "" });
  }
  return json({ universeId: String(payload.universeId) }, 200, env, request);
}

async function robloxPlaceIcons(url, env, request) {
  const ids = parseIdList(url.searchParams.get("placeIds"));
  if (!ids) return json({ error: "invalid_place_ids", data: [] }, 400, env, request);
  const query = new URLSearchParams({ placeIds: ids.join(","), returnPolicy: "PlaceHolder", size: "512x512", format: "Webp", isCircular: "false" });
  const { response, payload } = await upstreamJson(`${ROBLOX_THUMBNAILS}/places/gameicons?${query}`);
  if (!response.ok) return json({ error: response.status === 429 ? "rate_limited" : "place_icon_request_failed", data: [] }, response.status, env, request, { "retry-after": response.headers.get("retry-after") || "" });
  return json({ data: Array.isArray(payload?.data) ? payload.data : [] }, 200, env, request);
}

async function robloxGameThumbnails(url, env, request) {
  const ids = parseIdList(url.searchParams.get("universeIds"));
  if (!ids) return json({ error: "invalid_universe_ids", data: [] }, 400, env, request);
  const query = new URLSearchParams({ universeIds: ids.join(","), returnPolicy: "PlaceHolder", size: "512x512", format: "Webp", isCircular: "false" });
  const { response, payload } = await upstreamJson(`${ROBLOX_THUMBNAILS}/games/icons?${query}`);
  if (!response.ok) return json({ error: response.status === 429 ? "rate_limited" : "thumbnail_request_failed", data: [] }, response.status, env, request, { "retry-after": response.headers.get("retry-after") || "" });
  return json({ data: Array.isArray(payload?.data) ? payload.data : [] }, 200, env, request);
}

async function robloxGroupIcons(url, env, request) {
  const ids = parseIdList(url.searchParams.get("groupIds"));
  if (!ids) return json({ error: "invalid_group_ids", data: [] }, 400, env, request);
  const query = new URLSearchParams({ groupIds: ids.join(","), size: "150x150", format: "Webp", isCircular: "false" });
  const { response, payload } = await upstreamJson(`${ROBLOX_THUMBNAILS}/groups/icons?${query}`);
  if (!response.ok) return json({ error: response.status === 429 ? "rate_limited" : "group_icon_request_failed", data: [] }, response.status, env, request, { "retry-after": response.headers.get("retry-after") || "" });
  return json({ data: Array.isArray(payload?.data) ? payload.data : [] }, 200, env, request);
}

function sanitizeDiscordGuild(guild, counts = {}, source) {
  return {
    guildId: String(guild?.id || ""),
    name: guild?.name || null,
    iconHash: guild?.icon || null,
    memberCount: counts.approximate_member_count ?? null,
    presenceCount: counts.approximate_presence_count ?? null,
    source,
  };
}

async function discordInvite(url, env, request) {
  const code = safeInviteCode(url.searchParams.get("code"));
  const guildIdHint = url.searchParams.get("guildId");
  if (!code && !isSnowflake(guildIdHint)) return json({ error: "invalid_discord_lookup" }, 400, env, request);

  if (code) {
    const inviteUrl = `${DISCORD_API}/invites/${encodeURIComponent(code)}?with_counts=true&with_expiration=true`;
    const { response, payload } = await upstreamJson(inviteUrl);
    if (response.ok && isSnowflake(String(payload?.guild?.id || ""))) {
      return json(sanitizeDiscordGuild(payload.guild, payload, "public-invite"), 200, env, request);
    }
    if (response.status === 429) return json({ error: "rate_limited" }, 429, env, request, { "retry-after": response.headers.get("retry-after") || "" });
  }

  if (isSnowflake(guildIdHint) && env.DISCORD_BOT_TOKEN) {
    const { response, payload } = await upstreamJson(`${DISCORD_API}/guilds/${guildIdHint}?with_counts=true`, {
      headers: { authorization: `Bot ${env.DISCORD_BOT_TOKEN}` },
    });
    if (response.ok && isSnowflake(String(payload?.id || ""))) {
      return json(sanitizeDiscordGuild(payload, payload, "authenticated-guild"), 200, env, request);
    }
    if (response.status === 429) return json({ error: "rate_limited" }, 429, env, request, { "retry-after": response.headers.get("retry-after") || "" });
  }

  if (isSnowflake(guildIdHint)) {
    const { response, payload } = await upstreamJson(`${DISCORD_API}/guilds/${guildIdHint}/widget.json`);
    if (response.ok && isSnowflake(String(payload?.id || ""))) {
      return json({ guildId: String(payload.id), name: payload.name || null, iconHash: null, memberCount: Array.isArray(payload.members) ? payload.members.length : null, presenceCount: null, source: "public-widget" }, 200, env, request);
    }
  }

  return json({ error: "discord_metadata_unavailable" }, 404, env, request);
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(env, request) });
    if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405, env, request, { allow: "GET, OPTIONS" });

    const url = new URL(request.url);
    try {
      if (url.pathname === "/api/roblox/universe") return cached(request, env, ctx, 86400, () => robloxUniverse(url, env, request));
      if (url.pathname === "/api/roblox/place-icons") return cached(request, env, ctx, 3600, () => robloxPlaceIcons(url, env, request));
      if (url.pathname === "/api/roblox/thumbnails") return cached(request, env, ctx, 3600, () => robloxGameThumbnails(url, env, request));
      if (url.pathname === "/api/roblox/groups") return cached(request, env, ctx, 21600, () => robloxGroupIcons(url, env, request));
      if (url.pathname === "/api/discord/invite") return cached(request, env, ctx, 1800, () => discordInvite(url, env, request));
      return json({ error: "not_found" }, 404, env, request);
    } catch (error) {
      console.error("Media proxy request failed", { path: url.pathname, message: error instanceof Error ? error.message : String(error) });
      return json({ error: "upstream_unavailable" }, 502, env, request);
    }
  },
};
