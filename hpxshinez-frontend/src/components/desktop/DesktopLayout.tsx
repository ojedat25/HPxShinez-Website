import { AreasHours } from './AreasHours/AreasHours'
import { Book } from './Book/Book'
import { Footer } from './Footer/Footer'
import { Gallery } from './Gallery/Gallery'
import { Header } from './Header/Header'
import { Hero } from './Hero/Hero'
import { Services } from './Services/Services'
import styles from './DesktopLayout.module.css'

/** Full desktop page tree matching Bold.dc.html. */
export function DesktopLayout() {
  return (
    <div className={styles.root}>
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <AreasHours />
      <Book />
      <Footer />
    </div>
  )
}
