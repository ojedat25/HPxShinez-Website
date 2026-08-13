import { galleryMedia, photoSrc } from '../../../data/media'
import styles from './Gallery.module.css'

/** Mobile 3×2 gallery grid. */
export function Gallery() {
  return (
    <section className={styles.section}>
      <div className={styles.eyebrow}>The Gallery</div>
      <div className={styles.grid}>
        {galleryMedia.map((slot) => (
          // gallery1–gallery6: width 100% of 3-col cell; aspect-ratio 1/1 (~116×116 at 393px)
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
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
