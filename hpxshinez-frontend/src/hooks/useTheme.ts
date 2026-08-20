import { useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'hpxshinez-theme'

function readTheme(): Theme {
  if (typeof document === 'undefined') {
    return 'dark'
  }
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'light' || attr === 'dark' ? attr : 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Ignore quota / private-mode failures; attribute still drives CSS.
  }
}

/** Current light/dark theme, synced to html[data-theme] and localStorage. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readTheme)

  function setTheme(next: Theme) {
    applyTheme(next)
    setThemeState(next)
  }

  function toggleTheme() {
    setThemeState((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      applyTheme(next)
      return next
    })
  }

  return { theme, setTheme, toggleTheme }
}
