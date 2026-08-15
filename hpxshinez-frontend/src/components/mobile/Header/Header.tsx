import { Menu, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { Logo } from '../../shared/Logo/Logo'
import styles from './Header.module.css'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#areas', label: 'Areas' },
] as const

/** Sticky mobile nav: logo, wordmark, hamburger drawer. */
export function Header() {
  const [open, setOpen] = useState(false)
  const navId = useId()

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  function close() {
    setOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a href="#top" className={styles.brand} onClick={close}>
          <Logo size={34} />
          <span className={styles.wordmark}>
            HPxShinez <span className={styles.accent}>Detailz</span>
          </span>
        </a>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls={navId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? (
            <X size={20} color="var(--color-text)" strokeWidth={2.5} />
          ) : (
            <Menu size={20} color="var(--color-text)" strokeWidth={2.5} />
          )}
        </button>
      </div>
      {open ? (
        <nav id={navId} className={styles.drawer}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.drawerLink}
              onClick={close}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://instagram.com/HPxShinezDetailz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.drawerCta}
            onClick={close}
          >
            Book via DM
          </a>
        </nav>
      ) : null}
    </header>
  )
}
