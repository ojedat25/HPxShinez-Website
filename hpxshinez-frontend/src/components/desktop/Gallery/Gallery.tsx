import { galleryMedia, photoSrc } from '../../../data/media'
import styles from './Gallery.module.css'

/** Desktop Instagram-style gallery grid (m3-g1–g6). */
export function Gallery() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>Straight off the feed</div>
            <h2 className={styles.title}>The gallery</h2>
          </div>
          <a
            href="https://instagram.com/HPxShinezDetailz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.follow}
          >
            Follow @HPxShinezDetailz
          </a>
        </div>
        <div className={styles.grid}>
          {galleryMedia.map((slot) => (
            // gallery1–gallery6 (m3-g1–g6): width 100% of auto-fit minmax(150px,1fr) cell; aspect-ratio 1/1
            <div
              key={slot.slug}
              className={`${styles.media} ${styles.slot}`}
              style={{ aspectRatio: slot.aspectRatio }}
            >
              <img
                className={styles.mediaImg}
                src={photoSrc(slot.slug, 1024)}
                width={slot.width}
                height={slot.height}
                alt={slot.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
