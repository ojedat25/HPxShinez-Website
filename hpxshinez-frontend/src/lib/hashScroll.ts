/** Valid in-page section hashes on the home page. */
export const HOME_SECTION_HASHES = new Set([
  '#top',
  '#services',
  '#work',
  '#areas',
  '#book',
])

const WAIT_TIMEOUT_MS = 10000

/** Read location.hash when it matches a home section target. */
export function parseHomeHash(): string | null {
  const raw = window.location.hash
  if (!raw) return null

  const hash = raw.toLowerCase()
  return HOME_SECTION_HASHES.has(hash) ? hash : null
}

/** Wait until the hash target exists in the DOM (lazy layout/Gallery safe). */
export function waitForHashTarget(
  hash: string,
  signal?: AbortSignal,
): Promise<Element | null> {
  const existing = document.querySelector(hash)
  if (existing) return Promise.resolve(existing)

  if (signal?.aborted) return Promise.resolve(null)

  return new Promise((resolve) => {
    function finish(element: Element | null) {
      observer.disconnect()
      clearTimeout(timeoutId)
      signal?.removeEventListener('abort', onAbort)
      resolve(element)
    }

    function onAbort() {
      finish(null)
    }

    const observer = new MutationObserver(() => {
      const found = document.querySelector(hash)
      if (found) finish(found)
    })

    observer.observe(document.body, { childList: true, subtree: true })

    const timeoutId = setTimeout(() => {
      finish(document.querySelector(hash))
    }, WAIT_TIMEOUT_MS)

    signal?.addEventListener('abort', onAbort, { once: true })
  })
}

type ScrollToHashOptions = {
  /** Skip smooth-scroll animation (fresh-load hash navigation). */
  instant?: boolean
}

/** Scroll to a hash target; offset comes from CSS scroll-margin-top on sections. */
export function scrollToHashTarget(
  hash: string,
  options: ScrollToHashOptions = {},
): boolean {
  const element = document.querySelector(hash)
  if (!element) return false

  const html = document.documentElement
  const previousScrollBehavior = html.style.scrollBehavior

  if (options.instant) {
    html.style.scrollBehavior = 'auto'
  }

  element.scrollIntoView({ block: 'start' })

  if (options.instant) {
    requestAnimationFrame(() => {
      html.style.scrollBehavior = previousScrollBehavior
    })
  }

  return true
}
