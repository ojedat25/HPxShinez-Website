// Legal page registry — keep paths in sync with App.tsx routes and
// scripts/generate-route-html.mjs (build-time SEO) and render.yaml rewrites.
export const LEGAL_PAGES = [
  { path: '/privacy-policy', label: 'Privacy Policy' },
  { path: '/liability-disclaimer', label: 'Liability Disclaimer' },
  { path: '/booking-policy', label: 'Booking, Cancellation & Weather Policy' },
] as const

