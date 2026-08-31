import { lazy, Suspense, type ReactNode } from 'react'
import { useIsMobile } from './hooks/useIsMobile'

const DesktopLayout = lazy(() =>
  import('./components/desktop/DesktopLayout').then((module) => ({
    default: module.DesktopLayout,
  })),
)
const MobileLayout = lazy(() =>
  import('./components/mobile/MobileLayout').then((module) => ({
    default: module.MobileLayout,
  })),
)
const PrivacyPolicyPage = lazy(() =>
  import('./components/shared/LegalPageLayout/PrivacyPolicyPage').then(
    (module) => ({
      default: module.PrivacyPolicyPage,
    }),
  ),
)
const LiabilityDisclaimerPage = lazy(() =>
  import('./components/shared/LegalPageLayout/LiabilityDisclaimerPage').then(
    (module) => ({
      default: module.LiabilityDisclaimerPage,
    }),
  ),
)
const CancellationPolicyPage = lazy(() =>
  import('./components/shared/LegalPageLayout/CancellationPolicyPage').then(
    (module) => ({
      default: module.CancellationPolicyPage,
    }),
  ),
)

/** Pathname with a trailing slash stripped (except for `/`). */
function currentPathname(): string {
  const path = window.location.pathname
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1)
  }
  return path
}

/** Pathname switch for legal pages, then desktop vs mobile home layouts. */
function App() {
  const isMobile = useIsMobile()
  const pathname = currentPathname()

  let page: ReactNode
  switch (pathname) {
    case '/privacy-policy':
      page = <PrivacyPolicyPage />
      break
    case '/liability-disclaimer':
      page = <LiabilityDisclaimerPage />
      break
    case '/cancellation-policy':
      page = <CancellationPolicyPage />
      break
    default:
      page = isMobile ? <MobileLayout /> : <DesktopLayout />
  }

  return <Suspense fallback={null}>{page}</Suspense>
}

export default App
