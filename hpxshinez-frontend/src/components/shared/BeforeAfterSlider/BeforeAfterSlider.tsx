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

type ShownPair = {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  width: number
  height: number
}

const DEFAULT_POSITION = 50

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
  const labelId = useId()
  const [position, setPosition] = useState(DEFAULT_POSITION)
  const [shown, setShown] = useState<ShownPair>({
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
      setShown((current) => {
        if (current.beforeSrc !== beforeSrc || current.afterSrc !== afterSrc) {
          setPosition(DEFAULT_POSITION)
        }
        return { beforeSrc, afterSrc, beforeAlt, afterAlt, width, height }
      })
    })

    return () => {
      cancelled = true
    }
  }, [beforeSrc, afterSrc, beforeAlt, afterAlt, width, height])

  const setFromClientX = useCallback((clientX: number) => {
    const root = rootRef.current
    if (!root) return
    const rect = root.getBoundingClientRect()
    if (rect.width === 0) return
    setPosition(clampPercent(((clientX - rect.left) / rect.width) * 100))
  }, [])

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    setFromClientX(event.clientX)
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    setFromClientX(event.clientX)
  }

  const classNames = [styles.root, className].filter(Boolean).join(' ')
  const clipRight = 100 - position

  return (
    <div
      ref={rootRef}
      className={classNames}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
    >
      <img
        className={styles.img}
        src={shown.afterSrc}
        width={shown.width}
        height={shown.height}
        alt={shown.afterAlt}
        draggable={false}
      />
      <img
        className={`${styles.img} ${styles.before}`}
        src={shown.beforeSrc}
        width={shown.width}
        height={shown.height}
        alt={shown.beforeAlt}
        draggable={false}
        style={{ clipPath: `inset(0 ${clipRight}% 0 0)` }}
      />
      <div
        className={styles.divider}
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <span className={styles.handle} />
      </div>
      <label className={styles.srOnly} htmlFor={labelId}>
        Before and after comparison
      </label>
      <input
        id={labelId}
        className={styles.range}
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
      />
    </div>
  )
}
