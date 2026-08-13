import { Menu } from 'lucide-react'
import { Logo } from '../../shared/Logo/Logo'
import styles from './Header.module.css'

/** Sticky mobile nav: logo, wordmark, visual Menu (no drawer in mockup). */
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Logo size={34} />
        <span className={styles.wordmark}>
          HPxShinez <span className={styles.accent}>Detailz</span>
        </span>
      </div>
      <div className={styles.menu} aria-hidden="true">
        <Menu size={20} color="var(--color-text)" strokeWidth={2.5} />
      </div>
    </header>
  )
}
