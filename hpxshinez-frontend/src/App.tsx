import { DesktopLayout } from './components/desktop/DesktopLayout'
import { MobileLayout } from './components/mobile/MobileLayout'
import { useIsMobile } from './hooks/useIsMobile'

/** Top-level viewport switch between desktop and mobile trees. */
function App() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileLayout /> : <DesktopLayout />
}

export default App
