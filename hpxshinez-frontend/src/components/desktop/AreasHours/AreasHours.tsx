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

/** Desktop two-column service areas and hours. */
export function AreasHours() {
  return (
    <section id="areas" className={styles.section}>
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
          Mobile only. No shop, no address. We bring the gear to your driveway.
        </p>
      </div>
      <div>
        <div className={styles.eyebrow}>When we work</div>
        <h2 className={styles.title}>Hours</h2>
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
