import styles from './StickyDmBar.module.css'

/** Sticky bottom Book via Instagram DM bar (mobile only). */
export function StickyDmBar() {
  return (
    <a
      href="https://instagram.com/HPxShinezDetailz"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.bar}
    >
      {/* Instagram icon — no lucide equivalent */}
      <span className={styles.label}>Book via Instagram DM</span>
    </a>
  )
}
