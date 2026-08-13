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
    shared/          # Logo, ImagePlaceholder only
    desktop/         # Full desktop page tree
    mobile/          # Mobile inner content (no phone chrome)
  hooks/useIsMobile.ts
  styles/variables.css
  styles/global.css
  App.tsx            # Viewport switch
  main.tsx
```

## Viewport switch

`App` uses `useIsMobile()` (`matchMedia('(max-width: 767px)')`) and renders either `MobileLayout` or `DesktopLayout`. Section markup and CSS stay in parallel trees; only `Logo` and `ImagePlaceholder` are shared.

## Image slot inventory

| Component | Slot | Dimensions | Viewport |
|-----------|------|------------|----------|
| `desktop/Hero` | `heroLeft` (m3-h1) | `width: 100%` of 1fr col; `aspect-ratio: 3/4` (~351×468 at 1280) | Desktop |
| `desktop/Hero` | `heroCenter` (m3-h2) | `width: 100%` of 1.4fr col; `aspect-ratio: 4/3` (~491×368 at 1280) | Desktop |
| `desktop/Hero` | `heroRight` (m3-h3) | `width: 100%` of 1fr col; `aspect-ratio: 3/4` (~351×468 at 1280) | Desktop |
| `desktop/Gallery` | `gallery1`…`gallery6` (m3-g1–g6) | `width: 100%` of auto-fit `minmax(150px,1fr)`; `aspect-ratio: 1/1` | Desktop |
| `mobile/Hero` | `heroBanner` | `width: 100%`; `aspect-ratio: 16/9` (~393×221) | Mobile |
| `mobile/Gallery` | `gallery1`…`gallery6` | `width: 100%` of 3-col cell; `aspect-ratio: 1/1` (~116×116 at 393px) | Mobile |

Nav/footer logos use `src/assets/logo.png` (not placeholders).

## Notes

- Colors, spacing, and type sizes live in `styles/variables.css` — no hardcoded hex in components.
- Instagram SVG icons are left as commented placeholders (`{/* Instagram icon — no lucide equivalent */}`); lucide-react has no Instagram brand icon.
- Mobile hamburger uses `Menu` from `lucide-react`.
