# Cynex | Roblox Scripter Portfolio

A GitHub Pages-ready rebuild using Next.js App Router, React, TypeScript, Tailwind CSS, and an optional Prisma/PostgreSQL backend example.

## Why the previous upload did not work

GitHub Pages only serves static files. Uploading Next.js source files directly does not create the HTML, CSS, and JavaScript bundle that a browser can open. The earlier project also contained dynamic Next.js route handlers and a Prisma inquiry endpoint, which require a running Node.js server and cannot execute on GitHub Pages.

This version fixes that by:

- enabling Next.js static export with `output: "export"`;
- creating an `out/` website during `npm run build`;
- deploying `out/` automatically with `.github/workflows/deploy-pages.yml`;
- detecting whether the repository is a user site such as `nathmadgam.github.io` or a project site with a repository subpath;
- prefixing every local image, video, PDF, poster, and icon correctly;
- replacing the database-only contact submission with a static email inquiry composer;
- moving server-only Next.js/Prisma examples outside `app/` so they do not break the static build;
- retaining local Roblox and Discord artwork while attempting official browser-side media refreshes.

## Publish on GitHub Pages

1. Delete the old website files in your repository.
2. Upload **the contents of this folder** to the repository root. Do not upload the enclosing ZIP folder as one nested directory.
3. Commit and push to `main` or `master`.
4. Open the repository on GitHub.
5. Go to **Settings → Pages**.
6. Under **Build and deployment**, set **Source** to **GitHub Actions**.
7. Open the **Actions** tab and wait for **Deploy Cynex portfolio to GitHub Pages** to finish.

For a user website, the repository should be named exactly `nathmadgam.github.io`. The workflow also supports normal project repositories and automatically adds the repository name to asset paths.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Test the static production build

```bash
npm install
npm run typecheck
npm run build
npx serve out
```

The exported site is created in `out/`.

## GitHub Pages limitations

GitHub Pages cannot run Prisma, PostgreSQL, `app/api` route handlers, Server Actions, or any other Node.js backend at runtime. The public portfolio works fully as a static site, and the inquiry form opens an email addressed to `nathanielmadridgaminde@proton.me`.

The Prisma schema and original server route examples remain in `prisma/` and `server-examples/` for a later Vercel, Railway, Render, or other Node.js deployment. They are intentionally excluded from the GitHub Pages build.

## External Roblox and Discord images

Local cached artwork displays immediately and prevents broken-image placeholders. The browser then attempts to refresh media through the official public Roblox and Discord endpoints. Set `NEXT_PUBLIC_MEDIA_PROXY_BASE` to a separately deployed secure proxy when a visitor's browser or a platform CORS policy blocks direct requests.

## Important files

- `.github/workflows/deploy-pages.yml` — automatic GitHub Pages build and deployment
- `next.config.ts` — static export and repository-subpath detection
- `lib/paths.ts` — correct public-asset paths on user and project Pages sites
- `lib/media-client.ts` — official media refresh, caching, retries, and fallbacks
- `components/ContactForm.tsx` — static email inquiry flow
- `prisma/schema.prisma` — optional full-stack inquiry data model
- `server-examples/` — server-only API routes retained for non-Pages hosting
- `public/downloads/Cynex-Services-Agreement-Fillable.pdf` — contract form
