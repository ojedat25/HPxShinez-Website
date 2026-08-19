import { AreasHours } from './AreasHours/AreasHours'
import { Book } from './Book/Book'
import { Footer } from './Footer/Footer'
import { Gallery } from './Gallery/Gallery'
import { Header } from './Header/Header'
import { Hero } from './Hero/Hero'
import { Services } from './Services/Services'
import styles from './MobileLayout.module.css'

/** Mobile page tree matching Bold Mobile inner content (no phone chrome). */
export function MobileLayout() {
  return (
    <div className={`${styles.root} mobile`}>
      {/* Header → Hero → Services → Gallery → AreasHours → Book → Footer */}
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <AreasHours />
        <Book />
      </main>
      <Footer />
    </div>
  )
}
