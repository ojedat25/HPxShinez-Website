import { GalleryStage } from '../../shared/GalleryStage/GalleryStage'
import styles from './Gallery.module.css'

/** Mobile work section: featured compare slider + optional stills. */
export function Gallery() {
  return (
    <section id="work" className={styles.section}>
      {/* --- Section header --- */}
      <h2 className={styles.eyebrow}>The Gallery</h2>
      {/* Mobile loads 640px stills */}
      <GalleryStage imageWidth={640} />
    </section>
  )
}
