import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  photoSrc,
  type HeroSlide,
  type PhotoWidth,
} from '../../../data/media'
import styles from './HeroSlider.module.css'

const SLIDE_INTERVAL_MS = 3000
const HEIGHT_CAP = 0.7
const PORTRAIT_ASPECT = 3 / 4

function sliderMaxWidthPx(viewportHeight: number) {
  return viewportHeight * HEIGHT_CAP * PORTRAIT_ASPECT
}

export type HeroSliderProps = {
  slides: readonly HeroSlide[]
  width: PhotoWidth
  className?: string
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Auto-rotating hero slider with prev/next buttons. */
export function HeroSlider({ slides, width, className }: HeroSliderProps) {
  const labelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [trackIndex, setTrackIndex] = useState(1)
  const [animateTrack, setAnimateTrack] = useState(true)
  const [isHoverPaused, setIsHoverPaused] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(false)
  const viewportWidthRef = useRef(
    typeof window === 'undefined' ? 0 : window.innerWidth,
  )
  const [maxWidthPx, setMaxWidthPx] = useState(() =>
    typeof window === 'undefined'
      ? undefined
      : sliderMaxWidthPx(window.innerHeight),
  )

  const slideCount = slides.length
  const trackSlides =
    slideCount > 0 ? [slides[slideCount - 1], ...slides, slides[0]] : []
  const realIndex =
    trackIndex === 0
      ? slideCount - 1
      : trackIndex === slideCount + 1
        ? 0
        : trackIndex - 1
  const activeSlide = slides[realIndex]
  const isOnClone = trackIndex === 0 || trackIndex === slideCount + 1
  const rootClassName = [
    styles.root,
    controlsVisible && styles.controlsVisible,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const isPaused = isHoverPaused || controlsVisible

  const goTo = useCallback(
    (nextIndex: number, animate: boolean) => {
      let target = nextIndex
      if (prefersReducedMotion()) {
        if (target === 0) {
          target = slideCount
        } else if (target === slideCount + 1) {
          target = 1
        }
      }

      setAnimateTrack(animate)
      setTrackIndex(target)
    },
    [slideCount],
  )

  useEffect(() => {
    function onResize() {
      const nextWidth = window.innerWidth
      if (Math.abs(nextWidth - viewportWidthRef.current) < 2) {
        return
      }

      viewportWidthRef.current = nextWidth
      setMaxWidthPx(sliderMaxWidthPx(window.innerHeight))
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (slideCount <= 1 || isPaused || hasInteracted || prefersReducedMotion()) {
      return
    }

    const intervalId = window.setInterval(() => {
      goTo(trackIndex + 1, true)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [slideCount, isPaused, hasInteracted, trackIndex, goTo])

  useEffect(() => {
    if (!controlsVisible) {
      return
    }

    function onDocumentPointerDown(event: PointerEvent) {
      if (rootRef.current?.contains(event.target as Node)) {
        return
      }

      setControlsVisible(false)

      if (
        document.activeElement instanceof HTMLElement &&
        rootRef.current?.contains(document.activeElement)
      ) {
        document.activeElement.blur()
      }
    }

    document.addEventListener('pointerdown', onDocumentPointerDown)
    return () => {
      document.removeEventListener('pointerdown', onDocumentPointerDown)
    }
  }, [controlsVisible])

  function step(delta: number) {
    if (isOnClone) {
      return
    }

    setHasInteracted(true)
    goTo(trackIndex + delta, true)
  }

  function goToSlide(index: number) {
    if (isOnClone) {
      return
    }

    setHasInteracted(true)
    goTo(index + 1, true)
  }

  function onTransitionEnd() {
    if (trackIndex === 0) {
      goTo(slideCount, false)
      return
    }

    if (trackIndex === slideCount + 1) {
      goTo(1, false)
    }
  }

  if (!activeSlide) {
    return null
  }

  const trackClassName = [styles.track, animateTrack && styles.trackAnimated]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={rootRef}
      className={rootClassName}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      style={maxWidthPx != null ? { maxWidth: `${maxWidthPx}px` } : undefined}
      onPointerDown={() => setControlsVisible(true)}
      onMouseEnter={() => setIsHoverPaused(true)}
      onMouseLeave={() => setIsHoverPaused(false)}
      onFocusCapture={() => setIsHoverPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsHoverPaused(false)
        }
      }}
    >
      <p id={labelId} className={styles.srOnly}>
        Detailing photos
      </p>
      <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {activeSlide.alt}
      </p>
      <div
        className={styles.frame}
        style={{ aspectRatio: activeSlide.aspectRatio }}
      >
        <div
          className={trackClassName}
          style={{
            transform: `translate3d(${-trackIndex * 100}%, 0, 0)`,
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {trackSlides.map((slide, index) => {
            const isFirstReal = index === 1

            return (
              <img
                key={`${slide.slug}-${index}`}
                className={styles.slide}
                src={photoSrc(slide.slug, width)}
                width={slide.width}
                height={slide.height}
                alt=""
                aria-hidden="true"
                draggable={false}
                fetchPriority={isFirstReal ? 'high' : undefined}
                loading={isFirstReal ? 'eager' : 'lazy'}
                decoding="async"
              />
            )
          })}
        </div>
        {slideCount > 1 ? (
          <>
            <button
              type="button"
              className={`${styles.nav} ${styles.navPrev}`}
              aria-label="Previous slide"
              onClick={() => step(-1)}
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              className={`${styles.nav} ${styles.navNext}`}
              aria-label="Next slide"
              onClick={() => step(1)}
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </>
        ) : null}
      </div>
      <div className={styles.dots} role="group" aria-label="Slide controls">
        {slides.map((slide, index) => {
          const isActive = index === realIndex

          return (
            <button
              key={slide.slug}
              type="button"
              className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
              aria-label={`Show slide ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => goToSlide(index)}
            />
          )
        })}
      </div>
    </div>
  )
}
