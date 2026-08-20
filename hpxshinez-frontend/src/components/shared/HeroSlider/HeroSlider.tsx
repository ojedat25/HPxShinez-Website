import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
} from 'react'
import {
  photoSrc,
  type HeroSlide,
  type PhotoWidth,
} from '../../../data/media'
import styles from './HeroSlider.module.css'

const SLIDE_INTERVAL_MS = 5000
const SWIPE_RATIO = 0.18
const AXIS_LOCK_PX = 8

export type HeroSliderProps = {
  slides: readonly HeroSlide[]
  width: PhotoWidth
  className?: string
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Auto-rotating hero slider with pointer swipe (mouse drag + touch). */
export function HeroSlider({ slides, width, className }: HeroSliderProps) {
  const labelId = useId()
  const frameRef = useRef<HTMLDivElement>(null)
  const dragStartXRef = useRef(0)
  const dragStartYRef = useRef(0)
  const dragDeltaRef = useRef(0)
  const axisLockRef = useRef<'x' | 'y' | null>(null)
  const pointerIdRef = useRef<number | null>(null)
  const [trackIndex, setTrackIndex] = useState(1)
  const [animateTrack, setAnimateTrack] = useState(true)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHoverPaused, setIsHoverPaused] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

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
  const rootClassName = [styles.root, className].filter(Boolean).join(' ')
  const isPaused = isHoverPaused || isDragging

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
    if (slideCount <= 1 || isPaused || hasInteracted || prefersReducedMotion()) {
      return
    }

    const intervalId = window.setInterval(() => {
      goTo(trackIndex + 1, true)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [slideCount, isPaused, hasInteracted, trackIndex, goTo])

  function resetDrag() {
    pointerIdRef.current = null
    axisLockRef.current = null
    dragDeltaRef.current = 0
    setIsDragging(false)
    setDragX(0)
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || slideCount <= 1) {
      return
    }

    pointerIdRef.current = event.pointerId
    dragStartXRef.current = event.clientX
    dragStartYRef.current = event.clientY
    dragDeltaRef.current = 0
    axisLockRef.current = null
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== event.pointerId) {
      return
    }

    const deltaX = event.clientX - dragStartXRef.current
    const deltaY = event.clientY - dragStartYRef.current

    if (axisLockRef.current === null) {
      if (Math.abs(deltaX) < AXIS_LOCK_PX && Math.abs(deltaY) < AXIS_LOCK_PX) {
        return
      }

      axisLockRef.current = Math.abs(deltaX) >= Math.abs(deltaY) ? 'x' : 'y'
      if (axisLockRef.current === 'y') {
        pointerIdRef.current = null
        return
      }

      event.currentTarget.setPointerCapture(event.pointerId)
      setIsDragging(true)
    }

    if (axisLockRef.current !== 'x') {
      return
    }

    dragDeltaRef.current = deltaX
    setDragX(deltaX)
  }

  function finishGesture(event: PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== event.pointerId) {
      return
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    const frameWidth = frameRef.current?.offsetWidth ?? 0
    const delta = dragDeltaRef.current
    const swiped =
      axisLockRef.current === 'x' && Math.abs(delta) >= frameWidth * SWIPE_RATIO

    if (swiped) {
      setHasInteracted(true)
      goTo(trackIndex + (delta < 0 ? 1 : -1), true)
    } else if (axisLockRef.current === 'x') {
      setAnimateTrack(true)
    }

    resetDrag()
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

  const trackClassName = [
    styles.track,
    !isDragging && animateTrack && styles.trackAnimated,
  ]
    .filter(Boolean)
    .join(' ')
  const frameClassName = [styles.frame, isDragging && styles.frameDragging]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={rootClassName}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
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
        ref={frameRef}
        className={frameClassName}
        style={{ aspectRatio: activeSlide.aspectRatio }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishGesture}
        onPointerCancel={resetDrag}
      >
        <div
          className={trackClassName}
          style={{
            transform: `translate3d(calc(${-trackIndex * 100}% + ${dragX}px), 0, 0)`,
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
              onClick={() => {
                setHasInteracted(true)
                goTo(index + 1, true)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
