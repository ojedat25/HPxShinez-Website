import { SQUARE_BOOKING_URL } from '../../../data/booking'
import { heroSlides } from '../../../data/media'
import { HeroSlider } from '../../shared/HeroSlider/HeroSlider'
import styles from './Hero.module.css'

/** Desktop hero: copy left, rotating image slider right. */
export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.layout}>
        <div className={styles.copyBlock}>
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
            driveway and leave your ride flawless. Book a time online and we'll
            come to you.
          </p>
          <div className={styles.ctaRow}>
            <a
              href={SQUARE_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              Book now
            </a>
          </div>
        </div>
        <HeroSlider
          slides={heroSlides}
          width={800}
          className={styles.slider}
        />
      </div>
    </section>
  )
}
