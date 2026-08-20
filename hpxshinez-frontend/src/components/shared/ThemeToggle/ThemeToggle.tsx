import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../../hooks/useTheme'
import styles from './ThemeToggle.module.css'

/** Icon button that toggles light/dark theme (persisted via useTheme). */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const nextLabel =
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={nextLabel}
      title={nextLabel}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <Sun size={18} strokeWidth={2.25} />
      ) : (
        <Moon size={18} strokeWidth={2.25} />
      )}
    </button>
  )
}
