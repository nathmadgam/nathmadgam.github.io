# Cynex | Roblox Scripter Portfolio

A full-stack rebuild of the Cynex portfolio using Next.js App Router, TypeScript, Tailwind CSS, and Prisma with PostgreSQL.

## Included

- Responsive, ultrawide-safe layout with a centered `1540px` content container
- Smooth pointer, reveal, counter, ticker, portrait, scan-line, progress, and hover animation systems
- Compact interactive video collage with sound-enabled native controls
- Typed project, game, skill, network, process, and Fiverr review data
- Roblox place-to-universe thumbnail route with safe cached local fallbacks
- Discord invite metadata route supporting static and animated guild icons
- Scrollable five-page Contract Agreement Form viewer with zoom, page navigation, open, and download actions
- Prisma-backed project inquiry form
- Reduced-motion support, keyboard focus states, descriptive media text, and responsive layouts

## Requirements

- Node.js 20.19 or newer
- PostgreSQL connection string for storing inquiries

## Setup

```bash
npm install
cp .env.example .env
# Replace DATABASE_URL in .env with your PostgreSQL connection string.
npm run db:migrate -- --name init
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

For Vercel, add `DATABASE_URL` in Project Settings, run the first migration against the production database, and deploy normally.

## Important paths

- `app/page.tsx` — page composition
- `app/globals.css` — visual system and motion
- `components/` — interactive React components
- `lib/data.ts` — maintainable typed portfolio content
- `app/api/roblox/thumbnail/route.ts` — Roblox thumbnail proxy
- `app/api/discord/icon/route.ts` — Discord public invite/icon proxy
- `app/api/inquiries/route.ts` — inquiry storage route
- `prisma/schema.prisma` — inquiry database model
- `public/downloads/Cynex-Services-Agreement-Fillable.pdf` — downloadable contract form

## Environment variables

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
ALLOWED_ORIGINS="http://localhost:3000"
```

No Roblox API key, Discord bot token, or other private credential is required by the included public-media routes.
