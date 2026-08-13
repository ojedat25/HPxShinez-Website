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
    <section className={styles.section}>
      <div className={styles.eyebrow}>Service Areas</div>
      <div className={styles.chips}>
        {AREAS.map((area) => (
          <span key={area} className={styles.chip}>
            {area}
          </span>
        ))}
      </div>
      <div className={styles.eyebrow}>Hours</div>
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
