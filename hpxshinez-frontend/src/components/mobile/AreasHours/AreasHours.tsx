import { AREAS, HOURS } from '../../../data/areas'
import styles from './AreasHours.module.css'

/** Mobile service area chips and hours rows. */
export function AreasHours() {
  return (
    <section id="areas" className={styles.section}>
      {/* --- Areas --- */}
      <h2 className={styles.title}>Service Areas</h2>
      <div className={styles.chips}>
        {AREAS.map((area) => (
          <span key={area} className={styles.chip}>
            {area}
          </span>
        ))}
      </div>
      <p className={styles.note}>
        <strong className={styles.emphasis}>Mobile only.</strong> No shop, no
        address. We bring the gear to your driveway.
      </p>
      {/* --- Hours --- */}
      <h2 className={styles.title}>Days & Hours</h2>
      <div className={styles.hoursList}>
        {HOURS.map((row) => (
          <div key={row.days} className={styles.hoursRow}>
            <span className={styles.hoursDays}>{row.days}</span>
            <span className={styles.hoursTime}>{row.time}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
