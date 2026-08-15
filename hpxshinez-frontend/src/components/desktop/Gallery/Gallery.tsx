import { GalleryStage } from '../../shared/GalleryStage/GalleryStage'
import styles from './Gallery.module.css'

/** Desktop work section: featured compare slider + optional stills. */
export function Gallery() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.inner}>
        {/* --- Section header --- */}
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
        {/* Desktop loads 1024px stills */}
        <GalleryStage imageWidth={1024} />
      </div>
    </section>
  )
}
