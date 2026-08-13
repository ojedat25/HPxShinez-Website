import { ImagePlaceholder } from '../../shared/ImagePlaceholder/ImagePlaceholder'
import styles from './Hero.module.css'

/** Desktop hero: eyebrow, headline, copy, IG CTA, 3-column collage. */
export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.copyBlock}>
        <div className={styles.eyebrow}>
          Mobile detailing · Twin Cities metro
        </div>
        <h1 className={styles.title}>
          Get that
          <br />
          <span className={styles.accent}>shine</span> on
        </h1>
        <p className={styles.copy}>
          Mobile car detailing across the Minneapolis metro. We roll up to your
          driveway and leave your ride flawless. Booking is one DM away.
        </p>
        <div className={styles.ctaRow}>
          <a
            href="https://instagram.com/HPxShinezDetailz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            {/* Instagram icon — no lucide equivalent */}
            Book via Instagram DM
          </a>
        </div>
      </div>
      <div className={styles.collage}>
        {/* heroLeft (m3-h1): width 100% of 1fr col; aspect-ratio 3/4 (~351×468 at 1280 content) */}
        <div className={styles.sideSlot}>
          <ImagePlaceholder aspectRatio="3 / 4" className={styles.sideBorder} />
        </div>
        {/* heroCenter (m3-h2): width 100% of 1.4fr col; aspect-ratio 4/3 (~491×368 at 1280 content) */}
        <div className={styles.centerSlot}>
          <ImagePlaceholder
            aspectRatio="4 / 3"
            className={styles.centerBorder}
          />
        </div>
        {/* heroRight (m3-h3): width 100% of 1fr col; aspect-ratio 3/4 (~351×468 at 1280 content) */}
        <div className={styles.sideSlot}>
          <ImagePlaceholder aspectRatio="3 / 4" className={styles.sideBorder} />
        </div>
      </div>
    </section>
  )
}
