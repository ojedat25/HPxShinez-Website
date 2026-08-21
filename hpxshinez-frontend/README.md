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
  data/media.ts      # Photo/video slots + path helpers + gallery filter
  hooks/useIsMobile.ts
  styles/variables.css
  styles/global.css
  App.tsx            # Viewport switch
  main.tsx
public/
  images/webp/       # WebP stills at 640 (mobile) and 1024 (desktop)
  videos/mp4/        # Gallery clips (720×1280)
  videos/posters/    # First-frame WebP posters
```

## Viewport switch

`App` uses `useIsMobile()` (`matchMedia('(max-width: 767px)')`) and renders either `MobileLayout` or `DesktopLayout`. Section markup and CSS stay in parallel trees; `Logo`, `BeforeAfterSlider`, and `GalleryStage` are shared.

## Image slots

Stills are WebP-only from `public/images/webp` (`object-fit: cover`). Desktop slots load **1024**; mobile slots load **640**. Paths come from `photoSrc` in `src/data/media.ts`.

| Component | Slot | Photo | Aspect |
|-----------|------|-------|--------|
| `desktop/Hero` | `heroLeft` | `10-orange-lancer-foam` | `3/4` |
| `desktop/Hero` | `heroCenter` | `09-orange-lancer-hero` | `3/4` |
| `desktop/Hero` | `heroRight` | `11-orange-lancer-wheel` | `3/4` |
| `mobile/Hero` | 3-up collage | Same `10` / `09` / `11` as desktop | `3/4` |
| `desktop/Gallery` / `mobile/Gallery` | Compare (left) | Prev/next slider: tire `05`/`06`, rear seat `03`/`04`, mat `07`/`08` | `4/3` |
| | Thumbs (right) | Photos then clips (`galleryItems`, 3×3 pages). All / Images / Videos filter defaults to All. | `1/1` |

Hero LCP candidates use `fetchPriority="high"` (desktop center + mobile collage center). Gallery images use `loading="lazy"`.

Nav/footer logos use `src/assets/logo.png`.

## Gallery videos

Clips live in `public/videos/mp4` (720×1280 vertical) with posters in `public/videos/posters`. Paths come from `videoSrc` / `videoPosterSrc` in `src/data/media.ts`. Thumbs use the poster plus a play overlay; the lightbox plays with `controls`. The before/after slider stays visible on every filter.

| Clip | Why |
|------|-----|
| `02-foam-cannon-canopy` | Process / action variety |
| `03-kia-wheel-pressure-rinse` | Strongest wheel-process clip |

## Notes

- Colors, spacing, and type sizes live in `styles/variables.css` — no hardcoded hex in components.
- Instagram SVG icons are left as commented placeholders (`{/* Instagram icon — no lucide equivalent */}`); lucide-react has no Instagram brand icon.
- Mobile hamburger opens a drawer with Services, Work, Areas, and Book now.
