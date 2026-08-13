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

/** Mobile 3×2 gallery grid with IMAGE HERE overlays. */
export function Gallery() {
  return (
    <section className={styles.section}>
      <div className={styles.eyebrow}>The Gallery</div>
      <div className={styles.grid}>
        {GALLERY_SLOTS.map((slot) => (
          // gallery1–gallery6: width 100% of 3-col cell; aspect-ratio 1/1 (~116×116 at 393px)
          <ImagePlaceholder
            key={slot}
            aspectRatio="1 / 1"
            label="IMAGE HERE"
            className={styles.slot}
            overlayClassName={styles.slotOverlay}
          />
        ))}
      </div>
    </section>
  )
}
