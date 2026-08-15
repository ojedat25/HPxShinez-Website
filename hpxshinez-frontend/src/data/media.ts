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

export type PhotoWidth = 640 | 1024

export type PhotoAsset = {
  slug: PhotoSlug
  alt: string
  width: number
  height: number
}

/** WebP only — desktop uses 1024, mobile uses 640. */
export function photoSrc(slug: PhotoSlug, width: PhotoWidth) {
  return `/images/webp/${slug}-${width}.webp`
}

const PHOTO: Record<PhotoSlug, PhotoAsset> = {
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

export type ImageSlot = PhotoAsset & {
  aspectRatio: string
}

/** Desktop hero collage slots. */
export const desktopHeroMedia = {
  left: {
    ...PHOTO['10-orange-lancer-foam'],
    aspectRatio: '3 / 4',
  },
  center: {
    ...PHOTO['09-orange-lancer-hero'],
    aspectRatio: '3 / 4',
  },
  right: {
    ...PHOTO['11-orange-lancer-wheel'],
    aspectRatio: '3 / 4',
  },
} as const satisfies Record<string, ImageSlot>

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
    ...PHOTO['02-lancer-interior-after'],
    aspectRatio: '1 / 1',
  },
  {
    kind: 'beforeAfter',
    aspectRatio: '1 / 1',
    before: PHOTO['05-charger-tire-before'],
    after: PHOTO['06-charger-tire-after'],
  },
  {
    kind: 'beforeAfter',
    aspectRatio: '1 / 1',
    before: PHOTO['03-lancer-rear-seat-before'],
    after: PHOTO['04-lancer-rear-seat-after'],
  },
  {
    kind: 'beforeAfter',
    aspectRatio: '1 / 1',
    before: PHOTO['07-subaru-mat-before'],
    after: PHOTO['08-subaru-mat-after'],
  },
  {
    kind: 'still',
    ...PHOTO['12-kia-interior-finished'],
    aspectRatio: '1 / 1',
  },
  {
    kind: 'still',
    ...PHOTO['13-mat-foam-process'],
    aspectRatio: '1 / 1',
  },
  {
    kind: 'still',
    ...PHOTO['09-orange-lancer-hero'],
    aspectRatio: '1 / 1',
  },
  {
    kind: 'still',
    ...PHOTO['10-orange-lancer-foam'],
    aspectRatio: '1 / 1',
  },
  {
    kind: 'still',
    ...PHOTO['11-orange-lancer-wheel'],
    aspectRatio: '1 / 1',
  },
]

export const comparePairs: GalleryBeforeAfter[] = galleryMedia.filter(
  (slot): slot is GalleryBeforeAfter => slot.kind === 'beforeAfter',
)

export const galleryStills: GalleryStill[] = galleryMedia.filter(
  (slot): slot is GalleryStill => slot.kind === 'still',
)

/** All gallery photos, including compare before/after frames. */
export const galleryThumbs: PhotoAsset[] = galleryMedia.flatMap((slot) =>
  slot.kind === 'still' ? [slot] : [slot.before, slot.after],
)

/**
 * Reserved for a later pass (not copied to public/ yet).
 * Prefer gallery 1/1 or desktop hero side 3/4 — avoid 4/3 and 16/9 (heavy crop).
 */
export const reservedVideos = [
  {
    slug: '01-charger-gt-walkaround',
    futureUse: 'Gallery (or hero side)',
    reason: 'Finished-car showcase',
  },
  {
    slug: '02-foam-cannon-canopy',
    futureUse: 'Gallery',
    reason: 'Process / action variety',
  },
  {
    slug: '03-kia-wheel-pressure-rinse',
    futureUse: 'Gallery',
    reason: 'Strongest of the three wheel-process clips',
  },
] as const
