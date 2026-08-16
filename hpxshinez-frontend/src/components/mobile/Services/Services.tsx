import styles from './Services.module.css'

type ServiceCard = {
  title: string
  description: string
  price: string
}

const SERVICES: ServiceCard[] = [
  {
    title: 'Gloss',
    description: 'Quick exterior wash and dry.',
    price: '$99.99',
  },
  {
    title: 'Premier Gloss',
    description: 'Full exterior, decon through wax.',
    price: '$149.99',
  },
  {
    title: 'Revive',
    description: 'Fast interior reset, surfaces, glass.',
    price: '$199.99',
  },
  {
    title: 'Full Revive',
    description: 'Every inch detailed and conditioned.',
    price: '$249.99',
  },
]

/** Mobile 2×2 services grid. */
export function Services() {
  return (
    <section id="services" className={styles.section}>
      {/* --- Header --- */}
      <h2 className={styles.eyebrow}>Services</h2>
      {/* --- Card grid --- */}
      <div className={styles.grid}>
        {SERVICES.map((service) => (
          <div key={service.title} className={styles.card}>
            <div className={styles.cardTitle}>{service.title}</div>
            <p className={styles.cardCopy}>{service.description}</p>
            <span className={styles.badge}>{service.price}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
