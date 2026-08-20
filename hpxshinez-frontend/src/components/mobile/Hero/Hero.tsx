import { heroSlides } from '../../../data/media'
import { HeroSlider } from '../../shared/HeroSlider/HeroSlider'
import styles from './Hero.module.css'

/** Mobile hero: eyebrow, headline, copy, IG CTA, rotating image slider. */
export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.eyebrow}>
        Family owned detailing in the Twin Cities metro
      </div>
      <h1 className={styles.title}>
        Get that
        <br />
        <span className={styles.accent}>shine</span> on
      </h1>
      <p className={styles.copy}>
        Mobile car detailing across the Minneapolis metro. We roll up to your
        driveway. Booking is one DM away.
      </p>
      <a
        href="https://instagram.com/HPxShinezDetailz"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
      >
        {/* Instagram icon — no lucide equivalent */}
        Book via Instagram DM
      </a>
      <HeroSlider slides={heroSlides} width={640} className={styles.slider} />
    </section>
  )
}
