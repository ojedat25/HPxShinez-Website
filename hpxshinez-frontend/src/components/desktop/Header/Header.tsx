import { SQUARE_BOOKING_URL } from '../../../data/booking'
import { Logo } from '../../shared/Logo/Logo'
import styles from './Header.module.css'

const SECTION_LINKS = [
  { hash: '#services', label: 'Services' },
  { hash: '#work', label: 'Work' },
  { hash: '#areas', label: 'Areas & Hours' },
] as const

type HeaderProps = {
  /** Logo target. Home page uses `#top`; standalone pages pass `/`. */
  homeHref?: string
}

/** Sticky desktop nav: logo, wordmark, section links, Book now CTA. */
export function Header({ homeHref = '#top' }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* --- Brand --- */}
        <a href={homeHref} className={styles.brand}>
          <Logo size={40} />
          <span className={styles.wordmark}>
            HPxShinez <span className={styles.accent}>Detailz</span>
          </span>
        </a>
        {/* --- Section links + Book CTA --- */}
        <nav className={styles.nav}>
          {SECTION_LINKS.map((link) => (
            <a
              key={link.hash}
              href={homeHref === '/' ? `/${link.hash}` : link.hash}
              className={styles.navLink}
            >
              {link.label}
            </a>
          ))}
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
