import { SQUARE_BOOKING_URL } from '../../../data/booking'
import { Logo } from '../../shared/Logo/Logo'
import styles from './Header.module.css'

/** Sticky desktop nav: logo, wordmark, section links, Book now CTA. */
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* --- Brand --- */}
        <a href="#top" className={styles.brand}>
          <Logo size={40} />
          <span className={styles.wordmark}>
            HPxShinez <span className={styles.accent}>Detailz</span>
          </span>
        </a>
        {/* --- Section links + Book CTA --- */}
        <nav className={styles.nav}>
          <a href="#services" className={styles.navLink}>
            Services
          </a>
          <a href="#work" className={styles.navLink}>
            Work
          </a>
          <a href="#areas" className={styles.navLink}>
            Areas
          </a>
          <a
            href={SQUARE_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Book now
          </a>
        </nav>
      </div>
    </header>
  )
}
