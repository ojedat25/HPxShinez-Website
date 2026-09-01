# HPxShinez Frontend

React 19 + TypeScript + Vite single-page site for HPxShinez Detailz. Two parallel layout trees (desktop and mobile) share components and data modules. Booking is handled by Square Appointments (external links, no embedded forms).

## Scripts

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:5173
npm run build        # tsc → vite build → generate-route-html.mjs
npm run preview      # preview production build
npm run lint         # ESLint
```

## Tech stack

- **React 19** with `StrictMode`
- **Vite 8** for dev and production bundling
- **TypeScript** (strict, project references via `tsc -b`)
- **CSS Modules** for component styles; design tokens in `src/styles/variables.css`
- **lucide-react** for icons (no brand icons — Instagram links use text)
- **@fontsource** for Hanken Grotesk (body) and Saira Condensed (headings)

## Project structure

```
src/
  App.tsx                 # Route switch: legal pages vs home (desktop/mobile)
  main.tsx                # React mount point
  assets/logo.webp        # Brand mark (imported by Logo component)
  components/
    shared/               # Cross-viewport: Logo, HeroSlider, BeforeAfterSlider,
                            # GalleryStage, LegalPageLayout + legal page copy
    desktop/              # Desktop-only section components + DesktopLayout
    mobile/               # Mobile-only section components + MobileLayout
  data/
    areas.ts              # Cities served, hours, hero service-line helper
    booking.ts            # Square Appointments URLs
    legal.ts              # Legal page paths (footer links + route registry)
    media.ts              # Photo/video catalog, gallery slots, path helpers
    services.ts           # Service categories, prices, descriptions
  hooks/useIsMobile.ts    # matchMedia('(max-width: 767px)')
  lib/seo.ts              # Client-side meta tag updates for legal pages
  styles/
    variables.css         # Design tokens (colors, spacing, type scale)
    global.css            # Reset, fonts, base element styles
public/
  images/webp/            # WebP stills at 640, 800, and 1024 widths
  videos/mp4/             # Gallery clips (720×1280 vertical)
  videos/posters/         # First-frame WebP posters for video thumbs
  sitemap.xml             # Static sitemap (update lastmod when pages change)
  llms.txt                # LLM/crawler summary of site links
  robots.txt
scripts/
  generate-route-html.mjs # Post-build: per-route index.html with correct SEO tags
index.html                # Home page shell + LocalBusiness JSON-LD
```

## Architecture

### Viewport switch

`App.tsx` reads `useIsMobile()` (`max-width: 767px`) and renders either `MobileLayout` or `DesktopLayout` for the home page. Section markup and CSS live in parallel `desktop/` and `mobile/` trees. Shared UI (`Logo`, `HeroSlider`, `BeforeAfterSlider`, `GalleryStage`) lives in `shared/`.

`DesktopLayout` is lazy-loaded so mobile users do not download desktop-only code on first paint.

### Routing (no router library)

Pathname-based routing in `App.tsx`:

| Path | Component |
| --- | --- |
| `/` | `MobileLayout` or `DesktopLayout` |
| `/privacy-policy` | `PrivacyPolicyPage` |
| `/liability-disclaimer` | `LiabilityDisclaimerPage` |
| `/cancellation-policy` | `CancellationPolicyPage` |

Legal pages reuse the viewport-appropriate `Header`/`Footer` via `LegalPageLayout`, which also calls `setPageMeta()` from `lib/seo.ts` on mount.

`render.yaml` rewrites legal paths to their pre-built `dist/<route>/index.html` files. The catch-all `/* → /index.html` handles the home SPA.

### Lazy loading

- `DesktopLayout` and all three legal pages are `React.lazy` imports in `App.tsx`.
- `Gallery` is lazy-loaded inside both layouts (below the fold).
- `Suspense` fallbacks are `null` (sections appear when ready, no spinner).

### Page sections (both layouts)

`Header → Hero → Services → Gallery → AreasHours → Book → Footer`

Section anchor IDs used in nav links: `#top`, `#services`, `#work`, `#areas`, `#book`.

## Data layer

Content is centralized in `src/data/` so copy and URLs can be updated without hunting through components.

| File | Purpose |
| --- | --- |
| `services.ts` | `SERVICE_CATEGORIES` — titles, prices, descriptions, includes. Service `id` keys map to Square widget URLs in `booking.ts`. |
| `booking.ts` | `SQUARE_BOOKING_URL` (main CTA) and `SQUARE_SERVICE_WIDGETS` (per-service Book buttons). |
| `areas.ts` | `AREAS` city list, `HOURS` schedule, `heroServiceLine()` for the condensed hero line. |
| `media.ts` | Photo/video catalog, `heroSlides`, `galleryMedia`, `galleryItems`, and `photoSrc()` / `videoSrc()` path helpers. |
| `legal.ts` | `LEGAL_PAGES` array — keep in sync with `App.tsx` routes and `scripts/generate-route-html.mjs`. |

**When editing services:** also update the `hasOfferCatalog` JSON-LD block in `index.html` (comment in the file marks the sync point).

**When adding a legal page:** add the route to `legal.ts`, `App.tsx`, `generate-route-html.mjs`, `render.yaml` rewrites, `sitemap.xml`, and `public/llms.txt`.

## Media

### Photos

WebP only, stored in `public/images/webp/` as `{slug}-{width}.webp`.

| Width | Used for |
| --- | --- |
| 640 | Mobile hero slider, gallery thumbs |
| 800 | Desktop hero slider |
| 1024 | Desktop gallery compare slider, lightbox |

Register new photos in `media.ts` (`PhotoSlug`, `photoCatalog`, then wire into `heroSlides` or `galleryMedia`).

`index.html` preloads the LCP hero image (`10-orange-lancer-foam`) at 800px (desktop) and 640px (mobile).

### Videos

Clips in `public/videos/mp4/` (720×1280). Posters in `public/videos/posters/` as `{slug}-poster.webp`. Register in `galleryVideos` in `media.ts`.

### Logo

`src/assets/logo.webp` — imported by `Logo.tsx` so Vite hashes the filename in production.

## Gallery

`GalleryStage` (shared) powers both desktop and mobile gallery sections:

- **Left:** before/after compare slider (`BeforeAfterSlider`) cycling through `comparePairs`.
- **Right:** paginated 3×3 thumbnail grid with All / Images / Videos filter.
- **Lightbox:** full-size still (1024) or video with controls.

The compare slider stays visible regardless of filter. Gallery images use `loading="lazy"`; hero LCP candidates use `fetchPriority="high"`.

## Hero slider

`HeroSlider` auto-rotates `heroSlides` every 3 seconds. It starts with a single LCP slide and expands to an infinite loop track on first interaction or autoplay tick (performance optimization). Respects `prefers-reduced-motion`.

Desktop hero passes `width={800}`; mobile passes `width={640}`.

## Styling

- All colors, spacing, and type sizes come from CSS variables in `styles/variables.css`. Do not hardcode hex values in component CSS.
- Component styles use CSS Modules (`*.module.css`) colocated with their component.
- Mobile layout adds a `mobile` class on the root element for viewport-specific overrides.

## SEO

| Layer | File | When it applies |
| --- | --- | --- |
| Home meta + JSON-LD | `index.html` | Initial HTML for `/` |
| Legal page meta (build) | `scripts/generate-route-html.mjs` | Baked into `dist/<route>/index.html` at build time |
| Legal page meta (client) | `lib/seo.ts` via `LegalPageLayout` | Updates head tags after JS hydrates |
| Sitemap | `public/sitemap.xml` | Crawlers |
| LLM summary | `public/llms.txt` | AI crawlers |

Canonical site URL: `https://hpxshinez.com`

## Booking

All "Book now" and per-service "Book" buttons link to Square Appointments (opens in a new tab). URLs live in `src/data/booking.ts`. Add-ons without a Square widget show price only (no Book button).

## Deployment

Configured by `../render.yaml` at the repo root:

```yaml
rootDir: hpxshinez-frontend
buildCommand: npm ci && npm run build
staticPublishPath: dist
```

The build script runs `generate-route-html.mjs` after Vite to produce per-route HTML for legal pages with correct `<title>`, description, canonical, and Open Graph tags.

## Common tasks

### Change a service price or description

1. Edit `src/data/services.ts`
2. If the service name or description changed, update `hasOfferCatalog` in `index.html`

### Add a gallery photo

1. Export WebP at 640, 800 (if used in hero), and 1024 into `public/images/webp/`
2. Add the slug to `media.ts` (`PhotoSlug`, `photoCatalog`, and the relevant array)
3. Rebuild and verify in the gallery

### Update service areas or hours

1. Edit `src/data/areas.ts`
2. Update `areaServed` and `openingHoursSpecification` in `index.html` JSON-LD
3. Update the home `<meta name="description">` in `index.html` if cities changed

### Change Square booking links

Edit `src/data/booking.ts`. No other files reference the URLs directly (components import from there).

## Notes

- Instagram is linked as text (`@HPxShinezDetailz`); lucide-react has no Instagram brand icon.
- Legal page copy lives as JSX in `src/components/shared/LegalPageLayout/*Page.tsx`.
- `npm run build` must succeed locally before pushing; Render runs the same command.
