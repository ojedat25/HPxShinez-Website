import { lazy, Suspense } from 'react'
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

/** Top-level viewport switch between desktop and mobile trees. */
function App() {
  const isMobile = useIsMobile()
  return (
    <Suspense fallback={null}>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </Suspense>
  )
}

export default App
