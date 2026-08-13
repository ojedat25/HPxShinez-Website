import { ImagePlaceholder } from '../../shared/ImagePlaceholder/ImagePlaceholder'
import styles from './Hero.module.css'

/** Mobile hero: eyebrow, headline, copy, IG CTA, 16:9 image band. */
export function Hero() {
  return (
    <>
      <section className={styles.hero}>
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
      </section>
      {/* heroBanner: width 100%; aspect-ratio 16/9 (~393×221 at design width) */}
      <ImagePlaceholder
        aspectRatio="16 / 9"
        label="IMAGE HERE"
        className={styles.banner}
        overlayClassName={styles.bannerOverlay}
      />
    </>
  )
}
