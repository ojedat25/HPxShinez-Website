import { GalleryStage } from '../../shared/GalleryStage/GalleryStage'
import styles from './Gallery.module.css'

/** Mobile work section: featured compare slider + optional stills. */
export function Gallery() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.eyebrow}>The Gallery</div>
      <GalleryStage imageWidth={640} />
    </section>
  )
}
