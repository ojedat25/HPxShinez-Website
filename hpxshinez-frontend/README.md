# HPxShinez Frontend

React + TypeScript + Vite port of the Bold desktop and mobile mockups.

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Structure

```
src/
  assets/logo.png
  components/
    shared/          # Logo, BeforeAfterSlider, GalleryStage
    desktop/         # Full desktop page tree
    mobile/          # Mobile inner content (no phone chrome)
  data/media.ts      # Photo slots + path helpers + reserved video map
  hooks/useIsMobile.ts
  styles/variables.css
  styles/global.css
  App.tsx            # Viewport switch
  main.tsx
public/
  images/webp/       # WebP stills at 640 (mobile) and 1024 (desktop)
```

## Viewport switch

`App` uses `useIsMobile()` (`matchMedia('(max-width: 767px)')`) and renders either `MobileLayout` or `DesktopLayout`. Section markup and CSS stay in parallel trees; `Logo`, `BeforeAfterSlider`, and `GalleryStage` are shared.

## Image slots

Stills are WebP-only from `public/images/webp` (`object-fit: cover`). Desktop slots load **1024**; mobile slots load **640**. Paths come from `photoSrc` in `src/data/media.ts`.

| Component | Slot | Photo | Aspect |
|-----------|------|-------|--------|
| `desktop/Hero` | `heroLeft` | `10-orange-lancer-foam` | `3/4` |
| `desktop/Hero` | `heroCenter` | `09-orange-lancer-hero` | `4/3` |
| `desktop/Hero` | `heroRight` | `11-orange-lancer-wheel` | `3/4` |
| `mobile/Hero` | `heroBanner` | `09-orange-lancer-hero` | `16/9` |
| `desktop/Gallery` / `mobile/Gallery` | Compare (left) | Prev/next slider: tire `05`/`06`, rear seat `03`/`04`, mat `07`/`08` | `4/3` |
| | Thumbs (right) | 3×3 grid of compare frames + stills (`galleryThumbs`); click or prev/next to enlarge | `1/1` |

Hero LCP candidates use `fetchPriority="high"` (desktop center + mobile banner). Gallery images use `loading="lazy"`.

Nav/footer logos use `src/assets/logo.png`.

## Reserved videos (not wired yet)

Clips stay in `assets/hpxshinez-web-VIDEOS` (720×1280 vertical). Do not copy to `public/` until a later pass. Prefer gallery `1/1` or desktop hero side `3/4`; avoid `4/3` and `16/9` (heavy crop). `reservedVideos` in `media.ts` mirrors this table.

| Clip | Future use | Why |
|------|------------|-----|
| `01-charger-gt-walkaround` | Gallery (or hero side) | Finished-car showcase |
| `02-foam-cannon-canopy` | Gallery | Process / action variety |
| `03-kia-wheel-pressure-rinse` | Gallery | Strongest wheel-process clip |

A later pass can swap two gallery stills (e.g. slots 3 and 6) for muted looping `<video>` without re-deciding assets.

## Notes

- Colors, spacing, and type sizes live in `styles/variables.css` — no hardcoded hex in components.
- Instagram SVG icons are left as commented placeholders (`{/* Instagram icon — no lucide equivalent */}`); lucide-react has no Instagram brand icon.
- Mobile hamburger uses `Menu` from `lucide-react`.
