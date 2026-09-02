import { SQUARE_BOOKING_URL } from '../../../data/booking'
import styles from './Book.module.css'

/** Mobile book card with red top border and Book now CTA. */
export function Book() {
  return (
    <section id="book" className={styles.card}>
      {/* --- Copy --- */}
      <div className={styles.eyebrow}>Ready to shine</div>
      <h2 className={styles.title}>Book your shine</h2>
      <p className={styles.copy}>
        Pick a time, tell us about your vehicle, and we'll roll up to your
        driveway.
      </p>
      {/* --- Book CTA --- */}
      <a href={SQUARE_BOOKING_URL} className={styles.cta}>
        Book now
      </a>
      <div className={styles.handle}>Questions? @HPxShinezDetailz</div>
    </section>
  )
}
