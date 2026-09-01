import { AREAS, HOURS } from '../../../data/areas'
import styles from './AreasHours.module.css'

/** Desktop two-column service areas and hours. */
export function AreasHours() {
  return (
    <section id="areas" className={styles.section}>
      {/* --- Areas column --- */}
      <div>
        <div className={styles.eyebrow}>Where we roll up</div>
        <h2 className={styles.title}>Service areas</h2>
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
      </div>
      {/* --- Hours column --- */}
      <div>
        <div className={styles.eyebrow}>When we work</div>
        <h2 className={styles.title}>Days & Hours</h2>
        <div className={styles.hoursList}>
          {HOURS.map((row) => (
            <div key={row.days} className={styles.hoursRow}>
              <span className={styles.hoursDays}>{row.days}</span>
              <span className={styles.hoursTime}>{row.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
