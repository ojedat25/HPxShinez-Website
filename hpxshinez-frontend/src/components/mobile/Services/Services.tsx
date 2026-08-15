import styles from './Services.module.css'

type ServiceCard = {
  title: string
  description: string
}

const SERVICES: ServiceCard[] = [
  {
    title: 'Gloss',
    description: 'Quick exterior wash and dry.',
  },
  {
    title: 'Premier Gloss',
    description: 'Full exterior, decon through wax.',
  },
  {
    title: 'Revive',
    description: 'Fast interior reset, surfaces, glass.',
  },
  {
    title: 'Full Revive',
    description: 'Every inch detailed and conditioned.',
  },
]

/** Mobile 2×2 services grid with TBD badges. */
export function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.eyebrow}>Services</div>
      <div className={styles.grid}>
        {SERVICES.map((service) => (
          <div key={service.title} className={styles.card}>
            <div className={styles.cardTitle}>{service.title}</div>
            <p className={styles.cardCopy}>{service.description}</p>
            <span className={styles.badge}>TBD</span>
          </div>
        ))}
      </div>
    </section>
  )
}
