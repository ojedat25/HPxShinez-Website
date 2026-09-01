import { LEGAL_PAGES } from '../../../data/legal'
import styles from './Footer.module.css'

/** Mobile footer with Legal links and copyright. */
export function Footer() {
  return (
    <footer className={styles.footer}>
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
