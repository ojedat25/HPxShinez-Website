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

/** Map infinite-track index to a real slide index; clamp if track ever overshoots. */
function resolveRealIndex(trackIndex: number, slideCount: number) {
  if (slideCount <= 0) {
    return 0
  }

  if (trackIndex <= 0) {
    return slideCount - 1
  }

  if (trackIndex >= slideCount + 1) {
    return 0
  }

  return trackIndex - 1
}

/** Auto-rotating hero slider with prev/next buttons. */
export function HeroSlider({ slides, width, className }: HeroSliderProps) {
  const labelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [animateTrack, setAnimateTrack] = useState(true)
  const [isHoverPaused, setIsHoverPaused] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [fullTrack, setFullTrack] = useState(false)
  const fullTrackRef = useRef(false)
  const [controlsVisible, setControlsVisible] = useState(false)
  const [isDocumentHidden, setIsDocumentHidden] = useState(
    () => typeof document !== 'undefined' && document.hidden,
  )
  // Lock height-based max-width on first paint; ignore URL-bar height churn.
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
    slideCount === 0
      ? []
      : fullTrack && slideCount > 1
        ? [slides[slideCount - 1], ...slides, slides[0]]
        : [slides[0]]
  const realIndex = fullTrack
    ? resolveRealIndex(trackIndex, slideCount)
    : 0
  const activeSlide = slides[realIndex]
  const isOnClone =
    fullTrack && (trackIndex === 0 || trackIndex === slideCount + 1)
  const isTrackOutOfBounds =
    fullTrack &&
    slideCount > 0 &&
    (trackIndex < 0 || trackIndex > slideCount + 1)
  const rootClassName = [
    styles.root,
    controlsVisible && styles.controlsVisible,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const isPaused =
    isHoverPaused || controlsVisible || isOnClone || isDocumentHidden

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

  // Expand from the LCP-only slide to the looping track, then go to nextIndex.
  const enableFullTrack = useCallback(
    (nextTrackIndex: number) => {
      if (fullTrackRef.current) {
        goTo(nextTrackIndex, true)
        return
      }

      fullTrackRef.current = true
      setFullTrack(true)
      setAnimateTrack(false)
      setTrackIndex(1)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          goTo(nextTrackIndex, true)
        })
      })
    },
    [goTo],
  )

  const snapOffClone = useCallback(() => {
    if (!fullTrackRef.current) {
      return
    }

    if (trackIndex <= 0) {
      goTo(slideCount, false)
      return
    }

    if (trackIndex >= slideCount + 1) {
      goTo(1, false)
    }
  }, [trackIndex, slideCount, goTo])

  // Only recalc the height cap when width actually changes (rotate / desktop
  // resize). Mobile URL-bar show/hide changes height alone and is ignored.
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

  // Pause while hidden; snap off clones when the tab becomes visible again
  // (background tabs often skip transitionend, which would leave autoplay stuck).
  useEffect(() => {
    function onVisibilityChange() {
      setIsDocumentHidden(document.hidden)
      if (!document.hidden) {
        snapOffClone()
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [snapOffClone])

  // Recover immediately if track index ever walks past the clone slots.
  useEffect(() => {
    if (isTrackOutOfBounds) {
      snapOffClone()
    }
  }, [isTrackOutOfBounds, snapOffClone])

  useEffect(() => {
    if (
      slideCount <= 1 ||
      isPaused ||
      hasInteracted ||
      prefersReducedMotion()
    ) {
      return
    }

    const intervalId = window.setInterval(() => {
      if (!fullTrackRef.current) {
        enableFullTrack(2)
        return
      }

      goTo(trackIndex + 1, true)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [slideCount, isPaused, hasInteracted, trackIndex, goTo, enableFullTrack])

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
    if (isOnClone || isTrackOutOfBounds) {
      return
    }

    setHasInteracted(true)
    if (!fullTrackRef.current) {
      enableFullTrack(delta < 0 ? 0 : 2)
      return
    }

    goTo(trackIndex + delta, true)
  }

  function goToSlide(index: number) {
    if (isOnClone || isTrackOutOfBounds) {
      return
    }

    setHasInteracted(true)
    if (!fullTrackRef.current) {
      if (index === 0) {
        return
      }

      enableFullTrack(index + 1)
      return
    }

    goTo(index + 1, true)
  }

  function onTransitionEnd() {
    if (!fullTrackRef.current) {
      return
    }

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
            const isLcpSlide = fullTrack ? index === 1 : index === 0

            return (
              <img
                key={`${slide.slug}-${index}`}
                className={styles.slide}
                src={photoSrc(slide.slug, width)}
                width={slide.width}
                height={slide.height}
                alt={slide.alt}
                aria-hidden="true"
                draggable={false}
                fetchPriority={isLcpSlide ? 'high' : undefined}
                loading={isLcpSlide ? 'eager' : 'lazy'}
                decoding={isLcpSlide ? 'sync' : 'async'}
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
