import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
} from 'react'
import styles from './BeforeAfterSlider.module.css'

export type BeforeAfterSliderProps = {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  width: number
  height: number
  className?: string
}

type LoadedPair = {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  width: number
  height: number
}

const DEFAULT_WIPE_PERCENT = 50
const SETTLE_OVERSHOOT_PERCENT = 1

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value))
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image()
    image.onload = () => resolve()
    image.onerror = () => resolve()
    image.src = src
    if (image.complete) resolve()
  })
}

/** Before (left) / after (right) wipe with a draggable divider. */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  width,
  height,
  className,
}: BeforeAfterSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const wipeControlId = useId()
  const wipePercentRef = useRef(DEFAULT_WIPE_PERCENT)
  const lastDeltaRef = useRef(0)
  const settleFrameRef = useRef<number | null>(null)
  const settleGenerationRef = useRef(0)
  const [wipePercent, setWipePercent] = useState(DEFAULT_WIPE_PERCENT)
  const [isSettling, setIsSettling] = useState(false)
  // Paint `loadedPair` only after both images load so the wipe never flashes a half-ready pair.
  const [loadedPair, setLoadedPair] = useState<LoadedPair>({
    beforeSrc,
    afterSrc,
    beforeAlt,
    afterAlt,
    width,
    height,
  })

  const cancelSettle = useCallback(() => {
    settleGenerationRef.current += 1
    if (settleFrameRef.current !== null) {
      cancelAnimationFrame(settleFrameRef.current)
      settleFrameRef.current = null
    }
    setIsSettling(false)
  }, [])

  useEffect(() => {
    return () => {
      settleGenerationRef.current += 1
      if (settleFrameRef.current !== null) {
        cancelAnimationFrame(settleFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    Promise.all([loadImage(beforeSrc), loadImage(afterSrc)]).then(() => {
      if (cancelled) return
      setLoadedPair((current) => {
        if (current.beforeSrc !== beforeSrc || current.afterSrc !== afterSrc) {
          cancelSettle()
          wipePercentRef.current = DEFAULT_WIPE_PERCENT
          setWipePercent(DEFAULT_WIPE_PERCENT)
        }
        return { beforeSrc, afterSrc, beforeAlt, afterAlt, width, height }
      })
    })

    return () => {
      cancelled = true
    }
  }, [beforeSrc, afterSrc, beforeAlt, afterAlt, width, height, cancelSettle])

  const setWipeFromClientX = useCallback((clientX: number) => {
    const root = rootRef.current
    if (!root) return
    const rect = root.getBoundingClientRect()
    if (rect.width === 0) return
    const next = clampPercent(((clientX - rect.left) / rect.width) * 100)
    lastDeltaRef.current = next - wipePercentRef.current
    wipePercentRef.current = next
    setWipePercent(next)
  }, [])

  // Capture so drag continues even if the pointer leaves the slider.
  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return
    cancelSettle()
    event.currentTarget.setPointerCapture(event.pointerId)
    setWipeFromClientX(event.clientX)
    // Pointerdown jump is not a drag; only subsequent moves drive settle direction.
    lastDeltaRef.current = 0
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    setWipeFromClientX(event.clientX)
  }

  function onLostPointerCapture() {
    if (prefersReducedMotion()) return
    const delta = lastDeltaRef.current
    if (delta === 0) return

    const releasePercent = wipePercentRef.current
    const overshoot = clampPercent(
      releasePercent + Math.sign(delta) * SETTLE_OVERSHOOT_PERCENT,
    )
    if (overshoot === releasePercent) return

    wipePercentRef.current = overshoot
    setWipePercent(overshoot)

    const generation = settleGenerationRef.current
    settleFrameRef.current = requestAnimationFrame(() => {
      settleFrameRef.current = requestAnimationFrame(() => {
        settleFrameRef.current = null
        if (generation !== settleGenerationRef.current) return
        setIsSettling(true)
        wipePercentRef.current = releasePercent
        setWipePercent(releasePercent)
      })
    })
  }

  const rootClassName = [styles.root, isSettling && styles.settling, className]
    .filter(Boolean)
    .join(' ')
  const beforeClipRightPercent = 100 - wipePercent

  return (
    <div
      ref={rootRef}
      className={rootClassName}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onLostPointerCapture={onLostPointerCapture}
    >
      {/* After sits full-bleed; before is clipped from the right by `beforeClipRightPercent`. */}
      <img
        className={styles.img}
        src={loadedPair.afterSrc}
        width={loadedPair.width}
        height={loadedPair.height}
        alt={loadedPair.afterAlt}
        draggable={false}
      />
      <img
        className={`${styles.img} ${styles.before}`}
        src={loadedPair.beforeSrc}
        width={loadedPair.width}
        height={loadedPair.height}
        alt={loadedPair.beforeAlt}
        draggable={false}
        style={{ clipPath: `inset(0 ${beforeClipRightPercent}% 0 0)` }}
      />
      <div
        className={styles.divider}
        style={{ left: `${wipePercent}%` }}
        aria-hidden="true"
      >
        <span className={styles.handle} />
      </div>
      {/* Invisible range for keyboard / screen-reader control of the wipe. */}
      <label className={styles.srOnly} htmlFor={wipeControlId}>
        Before and after comparison
      </label>
      <input
        id={wipeControlId}
        className={styles.range}
        type="range"
        min={0}
        max={100}
        value={wipePercent}
        onChange={(event) => {
          const next = Number(event.target.value)
          cancelSettle()
          wipePercentRef.current = next
          setWipePercent(next)
        }}
      />
    </div>
  )
}
