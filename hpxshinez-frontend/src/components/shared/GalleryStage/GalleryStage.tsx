import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  comparePairs,
  galleryThumbs,
  photoSrc,
  type PhotoWidth,
} from '../../../data/media'
import { BeforeAfterSlider } from '../BeforeAfterSlider/BeforeAfterSlider'
import styles from './GalleryStage.module.css'

export type GalleryStageProps = {
  imageWidth: PhotoWidth
}

const GRID_CAP = 9

/** Featured compare on the left; thumbnail grid with prev/next on the right. */
export function GalleryStage({ imageWidth }: GalleryStageProps) {
  const [pairIndex, setPairIndex] = useState(0)
  const [thumbIndex, setThumbIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [showAllThumbs, setShowAllThumbs] = useState(false)

  const pair = comparePairs[pairIndex]
  const pairCount = comparePairs.length
  const thumbCount = galleryThumbs.length
  const visibleThumbs = showAllThumbs
    ? galleryThumbs
    : galleryThumbs.slice(0, GRID_CAP)
  const selected = galleryThumbs[thumbIndex]

  function goPair(delta: number) {
    setPairIndex((current) => (current + delta + pairCount) % pairCount)
  }

  function goThumb(delta: number) {
    setThumbIndex((current) => (current + delta + thumbCount) % thumbCount)
    setLightboxOpen(true)
  }

  function openThumb(index: number) {
    setThumbIndex(index)
    setLightboxOpen(true)
  }

  useEffect(() => {
    if (!lightboxOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowLeft') goThumb(-1)
      if (event.key === 'ArrowRight') goThumb(1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxOpen, thumbCount])

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.sliderFrame}>
          <BeforeAfterSlider
            key={pair.after.slug}
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

        <div className={styles.galleryPanel}>
          <div className={styles.galleryFrame}>
            <div className={styles.grid}>
              {visibleThumbs.map((slot) => {
                const index = galleryThumbs.findIndex(
                  (thumb) => thumb.slug === slot.slug,
                )
                return (
                  <button
                    key={slot.slug}
                    type="button"
                    className={
                      index === thumbIndex
                        ? `${styles.thumb} ${styles.thumbSelected}`
                        : styles.thumb
                    }
                    onClick={() => openThumb(index)}
                    aria-label={`Enlarge ${slot.alt}`}
                    aria-current={index === thumbIndex}
                  >
                    <img
                      className={styles.thumbImg}
                      src={photoSrc(slot.slug, 640)}
                      width={slot.width}
                      height={slot.height}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              className={`${styles.nav} ${styles.navPrev}`}
              onClick={() => goThumb(-1)}
              aria-label="Previous gallery image"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              className={`${styles.nav} ${styles.navNext}`}
              onClick={() => goThumb(1)}
              aria-label="Next gallery image"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>
          {galleryThumbs.length > GRID_CAP ? (
            <button
              type="button"
              className={styles.showMore}
              onClick={() => setShowAllThumbs((open) => !open)}
            >
              {showAllThumbs ? 'Show less' : 'Show more'}
            </button>
          ) : null}
        </div>
      </div>

      {lightboxOpen ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={selected.alt}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setLightboxOpen(false)}
            aria-label="Close enlarged image"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className={`${styles.nav} ${styles.navPrev}`}
            onClick={(event) => {
              event.stopPropagation()
              goThumb(-1)
            }}
            aria-label="Previous gallery image"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className={`${styles.nav} ${styles.navNext}`}
            onClick={(event) => {
              event.stopPropagation()
              goThumb(1)
            }}
            aria-label="Next gallery image"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
          <img
            className={styles.lightboxImg}
            src={photoSrc(selected.slug, 1024)}
            width={selected.width}
            height={selected.height}
            alt={selected.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  )
}
