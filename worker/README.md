# Optional media proxy

The portfolio first tries Roblox's public thumbnail/universe endpoints and Discord's public invite endpoint in the browser. Set `CYNEX_API_PROXY_BASE` before `assets/js/config.js` loads when your deployment encounters browser CORS restrictions, or replace the empty default in that file with this Worker's public URL.

## Routes

- `GET /api/roblox/universe?placeId=...`
- `GET /api/roblox/place-icons?placeIds=...`
- `GET /api/roblox/thumbnails?universeIds=...`
- `GET /api/roblox/groups?groupIds=...`
- `GET /api/discord/invite?code=...&guildId=...`

Responses are sanitized and edge-cached. The Discord route uses public invite metadata first. It uses the public widget only when a guild ID is supplied and that server has enabled its widget. An optional bot token is used server-side only as a final authenticated guild-metadata fallback.

## Environment

- `ALLOWED_ORIGIN`: public portfolio origin allowed by CORS. Not a secret.
- `DISCORD_BOT_TOKEN`: optional encrypted Worker secret. Never place this in frontend code, Git, or `wrangler.toml`.

Copy `wrangler.toml.example` to `wrangler.toml`, set the deployment name/origin, then deploy with Wrangler. No private credentials are required for Roblox thumbnails or ordinary public Discord invite lookups.
