// Photo and video catalog for hero, gallery compare pairs, and lightbox.
// Add new assets to public/images/webp/ (640, 800, 1024) or public/videos/
// then register slugs here. See README.md "Media" section for width conventions.

// --- Photo catalog + path helpers ---

/** Photo slug under /images/webp/ (without width suffix). */
export type PhotoSlug =
  | '02-lancer-interior-after'
  | '03-lancer-rear-seat-before'
  | '04-lancer-rear-seat-after'
  | '05-charger-tire-before'
  | '06-charger-tire-after'
  | '07-subaru-mat-before'
  | '08-subaru-mat-after'
  | '09-orange-lancer-hero'
  | '10-orange-lancer-foam'
  | '11-orange-lancer-wheel'
  | '12-kia-interior-finished'
  | '13-mat-foam-process'

export type PhotoWidth = 640 | 800 | 1024

export type PhotoAsset = {
  slug: PhotoSlug
  alt: string
  width: number
  height: number
}

/** WebP only — desktop hero uses 800, gallery desktop 1024, mobile 640. */
export function photoSrc(slug: PhotoSlug, width: PhotoWidth) {
  return `/images/webp/${slug}-${width}.webp`
}

const photoCatalog: Record<PhotoSlug, PhotoAsset> = {
  '02-lancer-interior-after': {
    slug: '02-lancer-interior-after',
    alt: 'Mitsubishi Lancer interior after a full detail',
    width: 1536,
    height: 2048,
  },
  '03-lancer-rear-seat-before': {
    slug: '03-lancer-rear-seat-before',
    alt: 'Mitsubishi Lancer rear seat before cleaning',
    width: 1536,
    height: 2048,
  },
  '04-lancer-rear-seat-after': {
    slug: '04-lancer-rear-seat-after',
    alt: 'Mitsubishi Lancer rear seat after cleaning',
    width: 1536,
    height: 2048,
  },
  '05-charger-tire-before': {
    slug: '05-charger-tire-before',
    alt: 'Dodge Charger tire and wheel before detailing',
    width: 1536,
    height: 2048,
  },
  '06-charger-tire-after': {
    slug: '06-charger-tire-after',
    alt: 'Dodge Charger tire and wheel after detailing',
    width: 1536,
    height: 2048,
  },
  '07-subaru-mat-before': {
    slug: '07-subaru-mat-before',
    alt: 'Subaru floor mat before deep cleaning',
    width: 1536,
    height: 1152,
  },
  '08-subaru-mat-after': {
    slug: '08-subaru-mat-after',
    alt: 'Subaru floor mat after deep cleaning',
    width: 1536,
    height: 2048,
  },
  '09-orange-lancer-hero': {
    slug: '09-orange-lancer-hero',
    alt: 'Orange Mitsubishi Lancer after a full exterior wash',
    width: 1536,
    height: 2048,
  },
  '10-orange-lancer-foam': {
    slug: '10-orange-lancer-foam',
    alt: 'Orange Mitsubishi Lancer covered in foam during wash',
    width: 1536,
    height: 2048,
  },
  '11-orange-lancer-wheel': {
    slug: '11-orange-lancer-wheel',
    alt: 'Orange Mitsubishi Lancer wheel detail after cleaning',
    width: 1536,
    height: 2048,
  },
  '12-kia-interior-finished': {
    slug: '12-kia-interior-finished',
    alt: 'Kia interior after a finished detail',
    width: 1536,
    height: 2048,
  },
  '13-mat-foam-process': {
    slug: '13-mat-foam-process',
    alt: 'Floor mats covered in foam during cleaning',
    width: 1536,
    height: 2048,
  },
}

// --- Hero slider slides ---

export type HeroSlide = PhotoAsset & {
  aspectRatio: string
}

/** Ordered hero slider photos (desktop and mobile). */
export const heroSlides = [
  {
    ...photoCatalog['10-orange-lancer-foam'],
    aspectRatio: '3 / 4',
  },
  {
    ...photoCatalog['09-orange-lancer-hero'],
    aspectRatio: '3 / 4',
  },
  {
    ...photoCatalog['11-orange-lancer-wheel'],
    aspectRatio: '3 / 4',
  },
] as const satisfies readonly HeroSlide[]

// --- Gallery stills + compare pairs ---

export type GalleryStill = PhotoAsset & {
  kind: 'still'
  aspectRatio: string
}

export type GalleryBeforeAfter = {
  kind: 'beforeAfter'
  aspectRatio: string
  before: PhotoAsset
  after: PhotoAsset
}

export type GallerySlot = GalleryStill | GalleryBeforeAfter

/** Gallery slots 1–6 (same order desktop + mobile). */
export const galleryMedia: GallerySlot[] = [
  {
    kind: 'still',
    ...photoCatalog['02-lancer-interior-after'],
    aspectRatio: '1 / 1',
  },
  {
    kind: 'beforeAfter',
    aspectRatio: '1 / 1',
    before: photoCatalog['05-charger-tire-before'],
    after: photoCatalog['06-charger-tire-after'],
  },
  {
    kind: 'beforeAfter',
    aspectRatio: '1 / 1',
    before: photoCatalog['03-lancer-rear-seat-before'],
    after: photoCatalog['04-lancer-rear-seat-after'],
  },
  {
    kind: 'beforeAfter',
    aspectRatio: '1 / 1',
    before: photoCatalog['07-subaru-mat-before'],
    after: photoCatalog['08-subaru-mat-after'],
  },
  {
    kind: 'still',
    ...photoCatalog['12-kia-interior-finished'],
    aspectRatio: '1 / 1',
  },
  {
    kind: 'still',
    ...photoCatalog['13-mat-foam-process'],
    aspectRatio: '1 / 1',
  },
  {
    kind: 'still',
    ...photoCatalog['09-orange-lancer-hero'],
    aspectRatio: '1 / 1',
  },
  {
    kind: 'still',
    ...photoCatalog['10-orange-lancer-foam'],
    aspectRatio: '1 / 1',
  },
  {
    kind: 'still',
    ...photoCatalog['11-orange-lancer-wheel'],
    aspectRatio: '1 / 1',
  },
]

export const comparePairs: GalleryBeforeAfter[] = galleryMedia.filter(
  (galleryItem): galleryItem is GalleryBeforeAfter =>
    galleryItem.kind === 'beforeAfter',
)

/** All gallery photos, including compare before/after frames. */
export const galleryPhotos: PhotoAsset[] = galleryMedia.flatMap((galleryItem) =>
  galleryItem.kind === 'still'
    ? [galleryItem]
    : [galleryItem.before, galleryItem.after],
)

// --- Videos ---

export type VideoSlug =
  | '02-foam-cannon-canopy'
  | '03-kia-wheel-pressure-rinse'

export type VideoAsset = {
  slug: VideoSlug
  alt: string
  width: number
  height: number
}

/** MP4 clip under /videos/mp4/. */
export function videoSrc(slug: VideoSlug) {
  return `/videos/mp4/${slug}.mp4`
}

/** First-frame WebP poster under /videos/posters/. */
export function videoPosterSrc(slug: VideoSlug) {
  return `/videos/posters/${slug}-poster.webp`
}

export const galleryVideos: VideoAsset[] = [
  {
    slug: '02-foam-cannon-canopy',
    alt: 'Foam cannon wash under a canopy',
    width: 720,
    height: 1280,
  },
  {
    slug: '03-kia-wheel-pressure-rinse',
    alt: 'Kia wheel pressure rinse during detailing',
    width: 720,
    height: 1280,
  },
]

// --- Combined gallery items + filter helpers ---

export type GalleryItem =
  | (PhotoAsset & { kind: 'photo' })
  | (VideoAsset & { kind: 'video' })

export type GalleryFilter = 'all' | 'images' | 'videos'

/** Photos in current gallery order, then the clips. */
export const galleryItems: GalleryItem[] = [
  ...galleryPhotos.map((photo) => ({ ...photo, kind: 'photo' as const })),
  ...galleryVideos.map((video) => ({ ...video, kind: 'video' as const })),
]

/** Slice galleryItems by All / Images / Videos. */
export function galleryFilterItems(filter: GalleryFilter): GalleryItem[] {
  if (filter === 'images') {
    return galleryItems.filter((item) => item.kind === 'photo')
  }
  if (filter === 'videos') {
    return galleryItems.filter((item) => item.kind === 'video')
  }
  return galleryItems
}
