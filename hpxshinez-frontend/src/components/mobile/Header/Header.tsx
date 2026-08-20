import { Menu, X } from 'lucide-react'
import { useEffect, useId, useState, type MouseEvent } from 'react'
import { SQUARE_BOOKING_URL } from '../../../data/booking'
import { Logo } from '../../shared/Logo/Logo'
import styles from './Header.module.css'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#areas', label: 'Areas & Hours' },
] as const

/** Sticky mobile nav: logo, wordmark, hamburger drawer. */
export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  // Hash to scroll to after the drawer closes (avoids scrolling while it is still covering the page).
  const [pendingHash, setPendingHash] = useState<string | null>(null)
  const drawerNavId = useId()

  useEffect(() => {
    if (!drawerOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setDrawerOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  // After close, scroll to the queued section and update the URL hash.
  useEffect(() => {
    if (drawerOpen || !pendingHash) return

    document.querySelector(pendingHash)?.scrollIntoView()
    history.pushState(null, '', pendingHash)
    setPendingHash(null)
  }, [drawerOpen, pendingHash])

  function closeDrawer() {
    setDrawerOpen(false)
  }

  function goToHash(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault()
    setPendingHash(href)
    setDrawerOpen(false)
  }

  return (
    <header className={styles.header}>
      {/* --- Bar + hamburger --- */}
      <div className={styles.bar}>
        <a
          href="#top"
          className={styles.brand}
          onClick={(event) => goToHash(event, '#top')}
        >
          <Logo size={34} />
          <span className={styles.wordmark}>
            HPxShinez <span className={styles.accent}>Detailz</span>
          </span>
        </a>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={drawerOpen}
          aria-controls={drawerNavId}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setDrawerOpen((current) => !current)}
        >
          {drawerOpen ? (
            <X size={20} color="var(--color-text)" strokeWidth={2.5} />
          ) : (
            <Menu size={20} color="var(--color-text)" strokeWidth={2.5} />
          )}
        </button>
      </div>
      {/* --- Drawer --- */}
      {drawerOpen ? (
        <nav id={drawerNavId} className={styles.drawer}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.drawerLink}
              onClick={(event) => goToHash(event, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={SQUARE_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.drawerCta}
            onClick={closeDrawer}
          >
            Book now
          </a>
        </nav>
      ) : null}
    </header>
  )
}
