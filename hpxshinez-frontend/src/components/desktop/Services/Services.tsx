import styles from './Services.module.css'

type ServiceCard = {
  title: string
  description: string
}

const SERVICES: ServiceCard[] = [
  {
    title: 'Gloss',
    description: 'Quick exterior wash and dry to bring back the shine.',
  },
  {
    title: 'Premier Gloss',
    description:
      'The full exterior treatment, decontamination through wax protection.',
  },
  {
    title: 'Revive',
    description: 'A fast interior reset, vacuum, surfaces, and glass.',
  },
  {
    title: 'Full Revive',
    description: 'Every inch of the interior detailed, cleaned, and conditioned.',
  },
]

/** Desktop services grid with pricing TBD note. */
export function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>What we do</div>
          <h2 className={styles.title}>Services</h2>
        </div>
        <div className={styles.pricingNote}>Pricing TBD · DM for a quote</div>
      </div>
      <div className={styles.grid}>
        {SERVICES.map((service) => (
          <div key={service.title} className={styles.card}>
            <div className={styles.cardTitle}>{service.title}</div>
            <p className={styles.cardCopy}>{service.description}</p>
            <span className={styles.badge}>Pricing TBD</span>
          </div>
        ))}
      </div>
    </section>
  )
}
