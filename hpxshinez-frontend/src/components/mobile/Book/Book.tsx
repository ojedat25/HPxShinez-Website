import styles from './Book.module.css'

/** Mobile book card with red top border and IG CTA. */
export function Book() {
  return (
    <section id="book" className={styles.card}>
      <div className={styles.eyebrow}>Ready to shine</div>
      <div className={styles.title}>Slide into our DMs</div>
      <p className={styles.copy}>
        Send your vehicle, location, and what you&apos;re after. We&apos;ll
        confirm a time that works. No forms, no phone tag.
      </p>
      <a
        href="https://instagram.com/HPxShinezDetailz"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
      >
        {/* Instagram icon — no lucide equivalent */}
        Book via Instagram DM
      </a>
      <div className={styles.handle}>@HPxShinezDetailz</div>
    </section>
  )
}
