# HPxShinez Website

Marketing site for **HPxShinez Detailz**, a family-owned mobile auto detailing business in the Twin Cities metro (Minneapolis, St. Paul, and nearby suburbs).

Live at [hpxshinez.com](https://hpxshinez.com). Deployed on [Render](https://render.com) as a static site.

## Repository layout

```
HPxShinez-Website/
  README.md              ← you are here
  render.yaml            ← Render deploy config (rootDir → hpxshinez-frontend)
  hpxshinez-frontend/    ← React + TypeScript + Vite app (all source code)
```

All development happens inside `hpxshinez-frontend/`. See [hpxshinez-frontend/README.md](hpxshinez-frontend/README.md) for architecture, data files, media conventions, and day-to-day tasks.

## Prerequisites

Install **Node.js** LTS from [nodejs.org](https://nodejs.org) (the project targets Node 22 in production).

```bash
node -v   # should print v22.x or newer
npm -v
```

## Quick start

```bash
cd hpxshinez-frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Press `Ctrl+C` to stop.

## Useful commands

Run these from `hpxshinez-frontend/`:

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Type-check, Vite production build, and generate legal-page HTML |
| `npm run preview` | Serve the `dist/` folder locally |
| `npm run lint` | ESLint |

## Deployment

Render reads `render.yaml` at the repo root:

- **Build:** `npm ci && npm run build` inside `hpxshinez-frontend/`
- **Publish:** `hpxshinez-frontend/dist`
- **SPA routing:** catch-all rewrite to `index.html`; legal routes get their own pre-rendered `index.html` files

Pushes to the connected branch trigger automatic deploys. No environment variables are required for the static site.

## Where to change things

| What you want to edit | Where |
| --- | --- |
| Service names, prices, copy | `hpxshinez-frontend/src/data/services.ts` |
| Square booking URLs | `hpxshinez-frontend/src/data/booking.ts` |
| Service areas and hours | `hpxshinez-frontend/src/data/areas.ts` |
| Gallery photos and videos | `hpxshinez-frontend/src/data/media.ts` + `public/images/webp/` and `public/videos/` |
| Legal page routes | `hpxshinez-frontend/src/data/legal.ts`, `App.tsx`, and `scripts/generate-route-html.mjs` |
| Home-page SEO / schema.org | `hpxshinez-frontend/index.html` |
| Colors, fonts, spacing | `hpxshinez-frontend/src/styles/variables.css` |

The frontend README has full detail on each of these.
