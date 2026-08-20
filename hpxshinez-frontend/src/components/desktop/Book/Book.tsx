import { SQUARE_BOOKING_URL } from '../../../data/booking'
import styles from './Book.module.css'

/** Desktop book CTA band with Square Appointments link. */
export function Book() {
  return (
    <section id="book" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        {/* --- Copy --- */}
        <div className={styles.eyebrow}>Ready to shine</div>
        <h2 className={styles.title}>Book your shine</h2>
        <p className={styles.copy}>
          Pick a time, tell us about your vehicle, and we'll roll up to
          your driveway.
        </p>
        {/* --- Book CTA --- */}
        <a
          href={SQUARE_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Book now
        </a>
        <div className={styles.handle}>Questions? @HPxShinezDetailz on Instagram</div>
      </div>
    </section>
  )
}
