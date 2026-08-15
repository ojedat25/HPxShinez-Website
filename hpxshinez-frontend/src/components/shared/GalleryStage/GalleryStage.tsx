import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  comparePairs,
  galleryFilterItems,
  photoSrc,
  videoPosterSrc,
  videoSrc,
  type GalleryFilter,
  type PhotoWidth,
} from '../../../data/media'
import { BeforeAfterSlider } from '../BeforeAfterSlider/BeforeAfterSlider'
import styles from './GalleryStage.module.css'

export type GalleryStageProps = {
  imageWidth: PhotoWidth
}

const GRID_CAP = 9

const FILTERS: { id: GalleryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'images', label: 'Images' },
  { id: 'videos', label: 'Videos' },
]

/** Featured compare on the left; thumbnail grid with prev/next on the right. */
export function GalleryStage({ imageWidth }: GalleryStageProps) {
  // Compare slider (independent of the thumbnail/lightbox selection)
  const [pairIndex, setPairIndex] = useState(0)
  // Thumbnail grid + lightbox
  const [thumbIndex, setThumbIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [gridPage, setGridPage] = useState(0)
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const videoRef = useRef<HTMLVideoElement>(null)

  const pair = comparePairs[pairIndex]
  const pairCount = comparePairs.length
  const items = galleryFilterItems(filter)
  const thumbCount = items.length
  const pageCount = Math.ceil(thumbCount / GRID_CAP)
  const showGridArrows = thumbCount > GRID_CAP
  const visibleThumbs = items.slice(
    gridPage * GRID_CAP,
    gridPage * GRID_CAP + GRID_CAP,
  )
  const selected = items[thumbIndex]

  // Prefetch every compare pair so prev/next on the slider feels instant.
  useEffect(() => {
    for (const item of comparePairs) {
      const before = new Image()
      before.src = photoSrc(item.before.slug, imageWidth)
      const after = new Image()
      after.src = photoSrc(item.after.slug, imageWidth)
    }
  }, [imageWidth])

  // Stop playback before swapping lightbox items or closing.
  function resetVideo() {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  // Wrap around the featured compare pairs.
  function goPair(delta: number) {
    setPairIndex((current) => (current + delta + pairCount) % pairCount)
  }

  // Clamp grid paging; no wrap (spacers hold layout when an arrow is hidden).
  function goGridPage(delta: number) {
    setGridPage((current) => {
      const next = current + delta
      if (next < 0 || next >= pageCount) return current
      return next
    })
  }

  // Step lightbox selection without wrapping past the first/last item.
  function goThumb(delta: number) {
    resetVideo()
    setThumbIndex((current) =>
      Math.min(thumbCount - 1, Math.max(0, current + delta)),
    )
    setLightboxOpen(true)
  }

  function openThumb(index: number) {
    setThumbIndex(index)
    setLightboxOpen(true)
  }

  function closeLightbox() {
    resetVideo()
    setLightboxOpen(false)
  }

  // Filter change resets paging and closes any open lightbox.
  function changeFilter(next: GalleryFilter) {
    setFilter(next)
    setGridPage(0)
    setThumbIndex(0)
    closeLightbox()
  }

  // Escape closes; arrows step the lightbox only while it is open.
  useEffect(() => {
    if (!lightboxOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft' && thumbIndex > 0) goThumb(-1)
      if (event.key === 'ArrowRight' && thumbIndex < thumbCount - 1) {
        goThumb(1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxOpen, thumbCount, thumbIndex])

  return (
    <>
      {/* --- Filter: All / Images / Videos --- */}
      <div className={styles.filter} role="group" aria-label="Gallery media type">
        {FILTERS.map((option) => {
          const isActive = filter === option.id
          return (
            <button
              key={option.id}
              type="button"
              className={
                isActive
                  ? `${styles.filterBtn} ${styles.filterBtnActive}`
                  : styles.filterBtn
              }
              aria-pressed={isActive}
              onClick={() => changeFilter(option.id)}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <div className={styles.layout}>
        {/* --- Featured before/after slider --- */}
        <div className={styles.sliderFrame}>
          <BeforeAfterSlider
            className={styles.slider}
            beforeSrc={photoSrc(pair.before.slug, imageWidth)}
            afterSrc={photoSrc(pair.after.slug, imageWidth)}
            beforeAlt={pair.before.alt}
            afterAlt={pair.after.alt}
            width={pair.after.width}
            height={pair.after.height}
          />
          <button
            type="button"
            className={`${styles.nav} ${styles.navPrev}`}
            onClick={() => goPair(-1)}
            aria-label="Previous comparison"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className={`${styles.nav} ${styles.navNext}`}
            onClick={() => goPair(1)}
            aria-label="Next comparison"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* --- Thumbnail grid (paginated 3x3) --- */}
        <div className={styles.galleryPanel}>
          {showGridArrows && gridPage > 0 ? (
            <button
              type="button"
              className={`${styles.nav} ${styles.gridNav}`}
              onClick={() => goGridPage(-1)}
              aria-label="Previous gallery page"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
          ) : showGridArrows ? (
            <span className={styles.gridNavSpacer} aria-hidden="true" />
          ) : null}
          <div className={styles.galleryFrame}>
            <div className={styles.grid}>
              {visibleThumbs.map((item, offset) => {
                const index = gridPage * GRID_CAP + offset
                const isSelected = lightboxOpen && index === thumbIndex
                return (
                  <button
                    key={`${item.kind}-${item.slug}`}
                    type="button"
                    className={
                      isSelected
                        ? `${styles.thumb} ${styles.thumbSelected}`
                        : styles.thumb
                    }
                    onClick={() => openThumb(index)}
                    aria-label={
                      item.kind === 'video'
                        ? `Play ${item.alt}`
                        : `Enlarge ${item.alt}`
                    }
                    aria-current={isSelected}
                  >
                    <img
                      className={styles.thumbImg}
                      src={
                        item.kind === 'video'
                          ? videoPosterSrc(item.slug)
                          : photoSrc(item.slug, 640)
                      }
                      width={item.width}
                      height={item.height}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    {item.kind === 'video' ? (
                      <span className={styles.thumbPlay} aria-hidden="true">
                        <span className={styles.thumbPlayIcon}>
                          <Play size={16} strokeWidth={2.5} fill="currentColor" />
                        </span>
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>
          {showGridArrows && gridPage < pageCount - 1 ? (
            <button
              type="button"
              className={`${styles.nav} ${styles.gridNav}`}
              onClick={() => goGridPage(1)}
              aria-label="Next gallery page"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          ) : showGridArrows ? (
            <span className={styles.gridNavSpacer} aria-hidden="true" />
          ) : null}
        </div>
      </div>

      {/* --- Lightbox (photo or video) --- */}
      {lightboxOpen && selected ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={selected.alt}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close gallery item"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
          <div className={styles.lightboxStage}>
            {thumbIndex > 0 ? (
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
                onClick={(event) => {
                  event.stopPropagation()
                  goThumb(-1)
                }}
                aria-label="Previous gallery item"
              >
                <ChevronLeft size={26} strokeWidth={2.5} />
              </button>
            ) : null}
            {thumbIndex < thumbCount - 1 ? (
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
                onClick={(event) => {
                  event.stopPropagation()
                  goThumb(1)
                }}
                aria-label="Next gallery item"
              >
                <ChevronRight size={26} strokeWidth={2.5} />
              </button>
            ) : null}
            {selected.kind === 'video' ? (
              <video
                key={selected.slug}
                ref={videoRef}
                className={styles.lightboxVideo}
                src={videoSrc(selected.slug)}
                poster={videoPosterSrc(selected.slug)}
                width={selected.width}
                height={selected.height}
                controls
                playsInline
                preload="metadata"
                aria-label={selected.alt}
                onClick={(event) => event.stopPropagation()}
              />
            ) : (
              <img
                className={styles.lightboxImg}
                src={photoSrc(selected.slug, 1024)}
                width={selected.width}
                height={selected.height}
                alt={selected.alt}
                onClick={(event) => event.stopPropagation()}
              />
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
