/**
 * Optional serverless proxy base, for example:
 * https://cynex-media-proxy.example.workers.dev
 *
 * Leave empty to use public browser-accessible endpoints first. The media service
 * automatically falls back to this proxy when configured and direct CORS fails.
 */
export const API_PROXY_BASE = globalThis.CYNEX_API_PROXY_BASE ?? "";

export const MEDIA_CACHE_TTL = {
  universe: 24 * 60 * 60 * 1000,
  robloxThumbnail: 60 * 60 * 1000,
  robloxGroup: 6 * 60 * 60 * 1000,
  discord: 30 * 60 * 1000,
  gameDetails: 6 * 60 * 60 * 1000,
};
