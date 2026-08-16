import styles from './AreasHours.module.css'

const AREAS = [
  'Minneapolis',
  'Columbia Heights',
  'Fridley',
  'Coon Rapids',
  'St. Anthony',
  'St. Paul',
  'Edina',
  'Richfield',
] as const

const HOURS = [
  { days: 'Mon to Fri', time: '5PM to 8PM' },
  { days: 'Sat to Sun', time: '10AM to 7PM' },
] as const

/** Mobile service area chips and hours rows (eyebrow-only headers). */
export function AreasHours() {
  return (
    <section id="areas" className={styles.section}>
      {/* --- Areas --- */}
      <h2 className={styles.eyebrow}>Service Areas</h2>
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
      <h2 className={styles.eyebrow}>Hours</h2>
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
