import { desktopHeroMedia, photoSrc } from '../../../data/media'
import styles from './Hero.module.css'

/** Mobile hero: eyebrow, headline, copy, IG CTA, 3-up collage. */
export function Hero() {
  const slots = [
    desktopHeroMedia.left,
    desktopHeroMedia.center,
    desktopHeroMedia.right,
  ]

  return (
    <>
      <section id="top" className={styles.hero}>
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
      <div className={styles.collage}>
        {slots.map((slot, index) => (
          <div
            key={slot.slug}
            className={`${styles.media} ${styles.slot}`}
            style={{ aspectRatio: slot.aspectRatio }}
          >
            <img
              className={styles.mediaImg}
              src={photoSrc(slot.slug, 640)}
              width={slot.width}
              height={slot.height}
              alt={slot.alt}
              fetchPriority={index === 1 ? 'high' : undefined}
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </>
  )
}
