import styles from './Footer.module.css'

/** Mobile copyright strip matching the desktop footer line. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* --- Copyright --- */}
      <div className={styles.copyright}>
        © 2026 HPxShinez Detailz - Book online
      </div>
    </footer>
  )
}
