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

const THUMBS_PER_PAGE = 9

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
  const [mediaFilter, setMediaFilter] = useState<GalleryFilter>('all')
  const videoRef = useRef<HTMLVideoElement>(null)

  const activeComparePair = comparePairs[pairIndex]
  const comparePairCount = comparePairs.length
  const filteredGalleryItems = galleryFilterItems(mediaFilter)
  const thumbCount = filteredGalleryItems.length
  const pageCount = Math.ceil(thumbCount / THUMBS_PER_PAGE)
  const showGridArrows = thumbCount > THUMBS_PER_PAGE
  const visibleThumbs = filteredGalleryItems.slice(
    gridPage * THUMBS_PER_PAGE,
    gridPage * THUMBS_PER_PAGE + THUMBS_PER_PAGE,
  )
  const lightboxItem = filteredGalleryItems[thumbIndex]
  const layoutRef = useRef<HTMLDivElement>(null)
  const [galleryNear, setGalleryNear] = useState(false)

  // Prefetch only the next compare pair once the gallery is near the viewport
  // (or after the first prev/next), so first load does not compete with LCP.
  useEffect(() => {
    if (galleryNear) return
    const layout = layoutRef.current
    if (!layout) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        setGalleryNear(true)
      },
      { rootMargin: '200px' },
    )
    observer.observe(layout)
    return () => observer.disconnect()
  }, [galleryNear])

  useEffect(() => {
    if (!galleryNear) return
    const nextPair = comparePairs[(pairIndex + 1) % comparePairCount]
    if (!nextPair) return

    let idleId = 0
    let timeoutId = 0

    function prefetchNextPair() {
      const before = new Image()
      before.src = photoSrc(nextPair.before.slug, imageWidth)
      const after = new Image()
      after.src = photoSrc(nextPair.after.slug, imageWidth)
    }

    if (typeof requestIdleCallback === 'function') {
      idleId = requestIdleCallback(prefetchNextPair)
    } else {
      timeoutId = window.setTimeout(prefetchNextPair, 1)
    }

    return () => {
      if (idleId) cancelIdleCallback(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [galleryNear, pairIndex, comparePairCount, imageWidth])

  // Stop playback before swapping lightbox items or closing.
  function resetVideo() {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  // Wrap around the featured compare pairs.
  function stepComparePair(delta: number) {
    setGalleryNear(true)
    setPairIndex(
      (current) => (current + delta + comparePairCount) % comparePairCount,
    )
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
  function stepLightboxItem(delta: number) {
    resetVideo()
    setThumbIndex((current) =>
      Math.min(thumbCount - 1, Math.max(0, current + delta)),
    )
    setLightboxOpen(true)
  }

  function openLightboxAt(index: number) {
    setThumbIndex(index)
    setLightboxOpen(true)
  }

  function closeLightbox() {
    resetVideo()
    setLightboxOpen(false)
  }

  // Filter change resets paging and closes any open lightbox.
  function applyMediaFilter(next: GalleryFilter) {
    setMediaFilter(next)
    setGridPage(0)
    setThumbIndex(0)
    closeLightbox()
  }

  // Escape closes; arrows step the lightbox only while it is open.
  useEffect(() => {
    if (!lightboxOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft' && thumbIndex > 0) stepLightboxItem(-1)
      if (event.key === 'ArrowRight' && thumbIndex < thumbCount - 1) {
        stepLightboxItem(1)
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
          const isFilterActive = mediaFilter === option.id
          return (
            <button
              key={option.id}
              type="button"
              className={
                isFilterActive
                  ? `${styles.filterBtn} ${styles.filterBtnActive}`
                  : styles.filterBtn
              }
              aria-pressed={isFilterActive}
              onClick={() => applyMediaFilter(option.id)}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <div ref={layoutRef} className={styles.layout}>
        {/* --- Featured before/after slider --- */}
        <div className={styles.sliderFrame}>
          <BeforeAfterSlider
            className={styles.slider}
            beforeSrc={photoSrc(activeComparePair.before.slug, imageWidth)}
            afterSrc={photoSrc(activeComparePair.after.slug, imageWidth)}
            beforeAlt={activeComparePair.before.alt}
            afterAlt={activeComparePair.after.alt}
            width={activeComparePair.after.width}
            height={activeComparePair.after.height}
          />
          <button
            type="button"
            className={`${styles.nav} ${styles.navPrev}`}
            onClick={() => stepComparePair(-1)}
            aria-label="Previous comparison"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className={`${styles.nav} ${styles.navNext}`}
            onClick={() => stepComparePair(1)}
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
                const index = gridPage * THUMBS_PER_PAGE + offset
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
                    onClick={() => openLightboxAt(index)}
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
      {lightboxOpen && lightboxItem ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.alt}
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
          {thumbIndex > 0 ? (
            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
              onClick={(event) => {
                event.stopPropagation()
                stepLightboxItem(-1)
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
                stepLightboxItem(1)
              }}
              aria-label="Next gallery item"
            >
              <ChevronRight size={26} strokeWidth={2.5} />
            </button>
          ) : null}
          <div className={styles.lightboxStage}>
            {lightboxItem.kind === 'video' ? (
              <video
                key={lightboxItem.slug}
                ref={videoRef}
                className={styles.lightboxVideo}
                src={videoSrc(lightboxItem.slug)}
                poster={videoPosterSrc(lightboxItem.slug)}
                width={lightboxItem.width}
                height={lightboxItem.height}
                controls
                playsInline
                preload="metadata"
                aria-label={lightboxItem.alt}
                onClick={(event) => event.stopPropagation()}
              />
            ) : (
              <img
                className={styles.lightboxImg}
                src={photoSrc(lightboxItem.slug, 1024)}
                width={lightboxItem.width}
                height={lightboxItem.height}
                alt={lightboxItem.alt}
                onClick={(event) => event.stopPropagation()}
              />
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
