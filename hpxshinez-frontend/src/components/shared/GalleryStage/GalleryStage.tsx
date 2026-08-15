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
  const [gridPage, setGridPage] = useState(0)

  const pair = comparePairs[pairIndex]
  const pairCount = comparePairs.length
  const thumbCount = galleryThumbs.length
  const pageCount = Math.ceil(thumbCount / GRID_CAP)
  const showGridArrows = thumbCount > GRID_CAP
  const visibleThumbs = galleryThumbs.slice(
    gridPage * GRID_CAP,
    gridPage * GRID_CAP + GRID_CAP,
  )
  const selected = galleryThumbs[thumbIndex]

  useEffect(() => {
    for (const item of comparePairs) {
      const before = new Image()
      before.src = photoSrc(item.before.slug, imageWidth)
      const after = new Image()
      after.src = photoSrc(item.after.slug, imageWidth)
    }
  }, [imageWidth])

  function goPair(delta: number) {
    setPairIndex((current) => (current + delta + pairCount) % pairCount)
  }

  function goGridPage(delta: number) {
    setGridPage((current) => {
      const next = current + delta
      if (next < 0 || next >= pageCount) return current
      return next
    })
  }

  function goThumb(delta: number) {
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
    setLightboxOpen(false)
  }

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
      <div className={styles.layout}>
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
              {visibleThumbs.map((slot, offset) => {
                const index = gridPage * GRID_CAP + offset
                const isSelected = lightboxOpen && index === thumbIndex
                return (
                  <button
                    key={slot.slug}
                    type="button"
                    className={
                      isSelected
                        ? `${styles.thumb} ${styles.thumbSelected}`
                        : styles.thumb
                    }
                    onClick={() => openThumb(index)}
                    aria-label={`Enlarge ${slot.alt}`}
                    aria-current={isSelected}
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

      {lightboxOpen ? (
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
            aria-label="Close enlarged image"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
          {thumbIndex > 0 ? (
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
          ) : null}
          {thumbIndex < thumbCount - 1 ? (
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
          ) : null}
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
