import { heroServiceLine } from '../../../data/areas'
import { SQUARE_BOOKING_URL } from '../../../data/booking'
import { heroSlides } from '../../../data/media'
import { HeroSlider } from '../../shared/HeroSlider/HeroSlider'
import styles from './Hero.module.css'

/** Mobile hero: eyebrow, headline, copy, Book now CTA, rotating image slider. */
export function Hero() {
  const { previewCities, moreCount, hours } = heroServiceLine()

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
        driveway. Book a time online and we'll come to you.
      </p>
      <p className={styles.serviceLine}>
        Serving {previewCities.join(', ')}
        {moreCount > 0 ? (
          <>
            {' '}
            <a href="#areas" className={styles.moreLink}>
              + {moreCount} more
            </a>
          </>
        ) : null}
        <br />
        {hours}
      </p>
      <a
        href={SQUARE_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
      >
        Book now
      </a>
      <HeroSlider slides={heroSlides} width={640} className={styles.slider} />
    </section>
  )
}
