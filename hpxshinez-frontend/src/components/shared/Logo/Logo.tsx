import logoSrc from '../../../assets/logo.png'
import styles from './Logo.module.css'

export type LogoProps = {
  /** Diameter of the circular logo mark in pixels (desktop nav 40, footer 42, mobile nav 34) */
  size: number
  className?: string
}

/** Circular brand mark from src/assets/logo.png. */
export function Logo({ size, className }: LogoProps) {
  const markClassName = [styles.mark, className].filter(Boolean).join(' ')

  return (
    <span
      className={markClassName}
      style={{ width: size, height: size }}
    >
      <img
        src={logoSrc}
        alt="HPxShinez Detailz"
        className={styles.image}
      />
    </span>
  )
}
