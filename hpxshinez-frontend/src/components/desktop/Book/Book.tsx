import styles from './Book.module.css'

/** Desktop book CTA band with Instagram DM link. */
export function Book() {
  return (
    <section id="book" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        {/* --- Copy --- */}
        <div className={styles.eyebrow}>Ready to shine</div>
        <h2 className={styles.title}>Slide into our DMs</h2>
        <p className={styles.copy}>
          Send your vehicle, location, and what you&apos;re after, and we&apos;ll
          confirm a time that works. No forms, no phone tag.
        </p>
        {/* --- Instagram CTA --- */}
        <a
          href="https://ig.me/m/hpxshinezdetailz"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          {/* Instagram icon — no lucide equivalent */}
          Book via Instagram DM
        </a>
        <div className={styles.handle}>@HPxShinezDetailz</div>
      </div>
    </section>
  )
}
