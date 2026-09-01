import { lazy, Suspense } from 'react'
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

/** Mobile page tree matching Bold Mobile inner content (no phone chrome). */
export function MobileLayout() {
  return (
    <div className={`${styles.root} mobile`}>
      {/* Header → Hero → Services → Gallery → AreasHours → Book → Footer */}
      <Header />
      <main>
        <Hero />
        <Services />
        <Suspense fallback={null}>
          <Gallery />
        </Suspense>
        <AreasHours />
        <Book />
      </main>
      <Footer />
    </div>
  )
}
