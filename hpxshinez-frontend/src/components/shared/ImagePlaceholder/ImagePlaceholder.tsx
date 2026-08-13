import type { CSSProperties } from 'react'
import styles from './ImagePlaceholder.module.css'

export type ImagePlaceholderProps = {
  /** CSS aspect-ratio value, e.g. "3 / 4" or "1 / 1" */
  aspectRatio: string
  /** Optional overlay label (e.g. "IMAGE HERE" for mobile slots) */
  label?: string
  className?: string
  /** Optional class for the dashed overlay (e.g. tighter inset on mobile gallery) */
  overlayClassName?: string
}

/** Locked image slot: width 100% + aspect-ratio; no external placeholder URLs. */
export function ImagePlaceholder({
  aspectRatio,
  label,
  className,
  overlayClassName,
}: ImagePlaceholderProps) {
  const style = {
    aspectRatio,
  } as CSSProperties

  const classNames = [styles.root, className].filter(Boolean).join(' ')
  const overlayClasses = [styles.overlay, overlayClassName]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classNames} style={style}>
      {label ? (
        <div className={overlayClasses}>
          <span className={styles.label}>{label}</span>
        </div>
      ) : null}
    </div>
  )
}
