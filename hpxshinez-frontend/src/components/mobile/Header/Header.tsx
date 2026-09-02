import { Menu, X } from 'lucide-react'
import { useEffect, useId, useState, type MouseEvent } from 'react'
import { SQUARE_BOOKING_URL } from '../../../data/booking'
import { Logo } from '../../shared/Logo/Logo'
import styles from './Header.module.css'

const NAV_LINKS = [
  { hash: '#services', label: 'Services' },
  { hash: '#work', label: 'Work' },
  { hash: '#areas', label: 'Areas & Hours' },
] as const

type HeaderProps = {
  /** Logo target. Home page uses `#top`; standalone pages pass `/`. */
  homeHref?: string
}

/** Sticky mobile nav: logo, wordmark, hamburger drawer. */
export function Header({ homeHref = '#top' }: HeaderProps) {
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
    if (!href.startsWith('#')) {
      setDrawerOpen(false)
      return
    }
    event.preventDefault()
    setPendingHash(href)
    setDrawerOpen(false)
  }

  return (
    <header className={styles.header}>
      {/* --- Bar + hamburger --- */}
      <div className={styles.bar}>
        <a
          href={homeHref}
          className={styles.brand}
          onClick={(event) => goToHash(event, homeHref)}
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
          {NAV_LINKS.map((link) => {
            const href = homeHref === '/' ? `/${link.hash}` : link.hash
            return (
              <a
                key={link.hash}
                href={href}
                className={styles.drawerLink}
                onClick={(event) => goToHash(event, href)}
              >
                {link.label}
              </a>
            )
          })}
          <a
            href={SQUARE_BOOKING_URL}
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
