import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AreasHours } from './AreasHours/AreasHours'
import { Book } from './Book/Book'
import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import { Hero } from './Hero/Hero'
import { Services } from './Services/Services'
import styles from './MobileLayout.module.css'

const Gallery = lazy(() =>
  import('./Gallery/Gallery').then((module) => ({ default: module.Gallery })),
)

/** Mount the gallery chunk only when it is close to the viewport. */
function GalleryNearViewport() {
  const slotRef = useRef<HTMLDivElement>(null)
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const slot = slotRef.current
    if (!slot) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        setShouldMount(true)
      },
      { rootMargin: '400px 0px' },
    )
    observer.observe(slot)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={slotRef}>
      {shouldMount ? (
        <Suspense fallback={null}>
          <Gallery />
        </Suspense>
      ) : (
        <section id="work" />
      )}
    </div>
  )
}

/** Mobile page tree matching Bold Mobile inner content (no phone chrome). */
export function MobileLayout() {
  return (
    <div className={`${styles.root} mobile`}>
      {/* Header → Hero → Services → Gallery → AreasHours → Book → Footer */}
      <Header />
      <main>
        <Hero />
        <Services />
        <GalleryNearViewport />
        <AreasHours />
        <Book />
      </main>
      <Footer />
    </div>
  )
}
