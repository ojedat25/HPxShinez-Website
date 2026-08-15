import styles from './Services.module.css'

type ServiceCard = {
  title: string
  description: string
  price: string
}

const SERVICES: ServiceCard[] = [
  {
    title: 'Gloss',
    description: 'Quick exterior wash and dry to bring back the shine.',
    price: '$99.99',
  },
  {
    title: 'Premier Gloss',
    description:
      'The full exterior treatment, decontamination through wax protection.',
    price: '$149.99',
  },
  {
    title: 'Revive',
    description: 'A fast interior reset, vacuum, surfaces, and glass.',
    price: '$199.99',
  },
  {
    title: 'Full Revive',
    description: 'Every inch of the interior detailed, cleaned, and conditioned.',
    price: '$249.99',
  },
]

/** Desktop services grid. */
export function Services() {
  return (
    <section id="services" className={styles.section}>
      {/* --- Header --- */}
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>What we do</div>
          <h2 className={styles.title}>Services</h2>
        </div>
      </div>
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
