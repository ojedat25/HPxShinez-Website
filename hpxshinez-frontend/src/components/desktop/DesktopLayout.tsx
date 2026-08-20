import { lazy, Suspense } from 'react'
import { AreasHours } from './AreasHours/AreasHours'
import { Book } from './Book/Book'
import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import { Hero } from './Hero/Hero'
import { Services } from './Services/Services'
import styles from './DesktopLayout.module.css'

const Gallery = lazy(() =>
  import('./Gallery/Gallery').then((module) => ({ default: module.Gallery })),
)

/** Full desktop page tree matching Bold.dc.html. */
export function DesktopLayout() {
  return (
    <div className={styles.root}>
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
