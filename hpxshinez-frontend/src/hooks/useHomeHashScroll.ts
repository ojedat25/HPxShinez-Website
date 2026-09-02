import { useLayoutEffect, useRef } from 'react'
import {
  parseHomeHash,
  scrollToHashTarget,
  waitForHashTarget,
} from '../lib/hashScroll'

/** Scroll to a home-section hash once per full page load (fresh URL or legal → /#fragment). */
export function useHomeHashScroll(isHome: boolean, isMobile: boolean): void {
  const scrolledRef = useRef(false)

  useLayoutEffect(() => {
    if (!isHome || scrolledRef.current) return

    const hash = parseHomeHash()
    if (!hash) return

    const existing = document.querySelector(hash)
    if (existing) {
      scrollToHashTarget(hash, { instant: true })
      scrolledRef.current = true
      return
    }

    const abortController = new AbortController()

    // #work is lazy-loaded; the observer may resolve only after the Gallery chunk mounts.
    void waitForHashTarget(hash, abortController.signal).then((element) => {
      if (abortController.signal.aborted || scrolledRef.current || !element) return

      scrollToHashTarget(hash, { instant: true })
      scrolledRef.current = true
    })

    return () => {
      abortController.abort()
    }
  }, [isHome, isMobile])
}
