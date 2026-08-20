import { Logo } from '../../shared/Logo/Logo'
import styles from './Footer.module.css'

/** Desktop footer with brand mark, handle CTA, and copyright. */
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
      {/* --- Copyright --- */}
      <div className={styles.copyright}>
        © 2026 HPxShinez Detailz - Site by{' '}
        <a
          href="https://dev-toni.me"
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
