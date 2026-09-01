import logoSrc from '../../../assets/logo.webp'
import styles from './Logo.module.css'

export type LogoProps = {
  /** Diameter of the circular logo mark in pixels (desktop nav 40, footer 42, mobile nav 34) */
  size: number
  className?: string
  /** Empty when brand text is adjacent; pass a name only when the mark is alone. */
  alt?: string
}

/** Circular brand mark from src/assets/logo.webp. */
export function Logo({ size, className, alt = '' }: LogoProps) {
  const markClassName = [styles.mark, className].filter(Boolean).join(' ')

  return (
    <span
      className={markClassName}
      style={{ width: size, height: size }}
    >
      <img
        src={logoSrc}
        alt={alt}
        className={styles.image}
      />
    </span>
  )
}
