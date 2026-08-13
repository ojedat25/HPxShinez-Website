import { ImagePlaceholder } from '../../shared/ImagePlaceholder/ImagePlaceholder'
import styles from './Gallery.module.css'

const GALLERY_SLOTS = [
  'gallery1',
  'gallery2',
  'gallery3',
  'gallery4',
  'gallery5',
  'gallery6',
] as const

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
          {GALLERY_SLOTS.map((slot) => (
            // gallery1–gallery6 (m3-g1–g6): width 100% of auto-fit minmax(150px,1fr) cell; aspect-ratio 1/1
            <ImagePlaceholder
              key={slot}
              aspectRatio="1 / 1"
              className={styles.slot}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
