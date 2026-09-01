import { useEffect, useState } from 'react'

// Breakpoint shared by App.tsx (layout switch) and LegalPageLayout (header/footer).
const MOBILE_QUERY = '(max-width: 767px)'

/** True when viewport matches mobile breakpoint (max-width: 767px). */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return window.matchMedia(MOBILE_QUERY).matches
  })

  // Re-run the desktop/mobile switch whenever the viewport crosses 767px.
  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_QUERY)
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    setIsMobile(mobileQuery.matches)
    mobileQuery.addEventListener('change', onChange)
    return () => {
      mobileQuery.removeEventListener('change', onChange)
    }
  }, [])

  return isMobile
}
