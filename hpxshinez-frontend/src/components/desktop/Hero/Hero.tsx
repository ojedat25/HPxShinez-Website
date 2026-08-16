import { heroCollage, photoSrc } from '../../../data/media'
import styles from './Hero.module.css'

/** Desktop hero: eyebrow, headline, copy, IG CTA, 3-column collage. */
export function Hero() {
  const { left, center, right } = heroCollage

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      {/* --- Copy block --- */}
      <div className={styles.copyBlock}>
        <div className={styles.eyebrow}>
          Mobile detailing - Twin Cities metro
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
      {/* --- Collage --- */}
      <div className={styles.collage}>
        {/* heroLeft (m3-h1): width 100% of 1fr col; aspect-ratio 3/4 (~351×468 at 1280 content) */}
        <div className={styles.sideSlot}>
          <div
            className={`${styles.media} ${styles.sideBorder}`}
            style={{ aspectRatio: left.aspectRatio }}
          >
            <img
              className={styles.mediaImg}
              src={photoSrc(left.slug, 1024)}
              width={left.width}
              height={left.height}
              alt={left.alt}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
        {/* heroCenter (m3-h2): width 100% of 1.4fr col; aspect-ratio 4/3 (~491×368 at 1280 content) */}
        <div className={styles.centerSlot}>
          <div
            className={`${styles.media} ${styles.centerBorder}`}
            style={{ aspectRatio: center.aspectRatio }}
          >
            <img
              className={styles.mediaImg}
              src={photoSrc(center.slug, 1024)}
              width={center.width}
              height={center.height}
              alt={center.alt}
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
        {/* heroRight (m3-h3): width 100% of 1fr col; aspect-ratio 3/4 (~351×468 at 1280 content) */}
        <div className={styles.sideSlot}>
          <div
            className={`${styles.media} ${styles.sideBorder}`}
            style={{ aspectRatio: right.aspectRatio }}
          >
            <img
              className={styles.mediaImg}
              src={photoSrc(right.slug, 1024)}
              width={right.width}
              height={right.height}
              alt={right.alt}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
