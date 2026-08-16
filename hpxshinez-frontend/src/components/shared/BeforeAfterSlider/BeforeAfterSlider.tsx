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

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value))
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
  const [wipePercent, setWipePercent] = useState(DEFAULT_WIPE_PERCENT)
  // Paint `loadedPair` only after both images load so the wipe never flashes a half-ready pair.
  const [loadedPair, setLoadedPair] = useState<LoadedPair>({
    beforeSrc,
    afterSrc,
    beforeAlt,
    afterAlt,
    width,
    height,
  })

  useEffect(() => {
    let cancelled = false

    Promise.all([loadImage(beforeSrc), loadImage(afterSrc)]).then(() => {
      if (cancelled) return
      setLoadedPair((current) => {
        if (current.beforeSrc !== beforeSrc || current.afterSrc !== afterSrc) {
          setWipePercent(DEFAULT_WIPE_PERCENT)
        }
        return { beforeSrc, afterSrc, beforeAlt, afterAlt, width, height }
      })
    })

    return () => {
      cancelled = true
    }
  }, [beforeSrc, afterSrc, beforeAlt, afterAlt, width, height])

  const setWipeFromClientX = useCallback((clientX: number) => {
    const root = rootRef.current
    if (!root) return
    const rect = root.getBoundingClientRect()
    if (rect.width === 0) return
    setWipePercent(clampPercent(((clientX - rect.left) / rect.width) * 100))
  }, [])

  // Capture so drag continues even if the pointer leaves the slider.
  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    setWipeFromClientX(event.clientX)
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    setWipeFromClientX(event.clientX)
  }

  const rootClassName = [styles.root, className].filter(Boolean).join(' ')
  const beforeClipRightPercent = 100 - wipePercent

  return (
    <div
      ref={rootRef}
      className={rootClassName}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
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
        onChange={(event) => setWipePercent(Number(event.target.value))}
      />
    </div>
  )
}
