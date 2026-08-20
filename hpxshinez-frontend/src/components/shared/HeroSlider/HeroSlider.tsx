import { useEffect, useId, useState } from 'react'
import {
  photoSrc,
  type HeroSlide,
  type PhotoWidth,
} from '../../../data/media'
import styles from './HeroSlider.module.css'

const SLIDE_INTERVAL_MS = 5000

export type HeroSliderProps = {
  slides: readonly HeroSlide[]
  width: PhotoWidth
  className?: string
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Auto-rotating single-image hero slider with fade and pause on hover/focus. */
export function HeroSlider({ slides, width, className }: HeroSliderProps) {
  const labelId = useId()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const activeSlide = slides[activeIndex]
  const rootClassName = [styles.root, className].filter(Boolean).join(' ')

  useEffect(() => {
    if (slides.length <= 1 || isPaused || prefersReducedMotion()) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [slides.length, isPaused])

  if (!activeSlide) {
    return null
  }

  return (
    <div
      className={rootClassName}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false)
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
        {slides.map((slide, index) => {
          const isActive = index === activeIndex

          return (
            <img
              key={slide.slug}
              className={`${styles.slide} ${isActive ? styles.slideActive : ''}`}
              src={photoSrc(slide.slug, width)}
              width={slide.width}
              height={slide.height}
              alt=""
              aria-hidden="true"
              fetchPriority={index === 0 ? 'high' : undefined}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          )
        })}
      </div>
      <div className={styles.dots} role="group" aria-label="Slide controls">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={slide.slug}
              type="button"
              className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
              aria-label={`Show slide ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => setActiveIndex(index)}
            />
          )
        })}
      </div>
    </div>
  )
}
