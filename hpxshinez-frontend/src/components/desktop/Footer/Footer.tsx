import { LEGAL_PAGES } from '../../../data/legal'
import { Logo } from '../../shared/Logo/Logo'
import styles from './Footer.module.css'

/** Desktop footer with brand mark, handle CTA, Legal links, and copyright. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* --- Brand row --- */}
      <div className={styles.top}>
        <div className={styles.brand}>
          <Logo size={42} />
          <div>
            <div className={styles.wordmark}>
              HPxShinez <span className={styles.accent}>Detailz</span>
            </div>
            <div className={styles.tagline}>
              Mobile car detailing - Twin Cities, MN
            </div>
          </div>
        </div>
        <a
          href="https://www.instagram.com/hpxshinezdetailz"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.handleCta}
        >
          @HPxShinezDetailz
        </a>
      </div>
      {/* --- Legal --- */}
      <nav className={styles.legal} aria-label="Legal">
        <span className={styles.legalLabel}>Legal</span>
        <ul className={styles.legalLinks}>
          {LEGAL_PAGES.map((page) => (
            <li key={page.path}>
              <a href={page.path} className={styles.creditLink}>
                {page.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* --- Copyright --- */}
      <div className={styles.copyright}>
        © 2026 HPxShinez Detailz - Site by{' '}
        <a
          href="https://github.com/ojedat25"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.creditLink}
        >
          Toni Ojeda
        </a>
      </div>
    </footer>
  )
}
