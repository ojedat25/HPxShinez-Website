import styles from './Footer.module.css'

/** Mobile copyright strip matching the desktop footer line. */
export function Footer() {
  return (
    <footer className={styles.footer}>
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
