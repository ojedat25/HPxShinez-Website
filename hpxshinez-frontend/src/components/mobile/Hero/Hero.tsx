import { mobileHeroMedia, photoSrc } from '../../../data/media'
import styles from './Hero.module.css'

/** Mobile hero: eyebrow, headline, copy, IG CTA, 16:9 image band. */
export function Hero() {
  const { banner } = mobileHeroMedia

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
      <div
        className={`${styles.media} ${styles.banner}`}
        style={{ aspectRatio: banner.aspectRatio }}
      >
        <img
          className={styles.mediaImg}
          src={photoSrc(banner.slug, 640)}
          width={banner.width}
          height={banner.height}
          alt={banner.alt}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </div>
    </>
  )
}
