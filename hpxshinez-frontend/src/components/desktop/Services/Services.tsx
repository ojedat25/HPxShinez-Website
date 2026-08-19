import { SERVICE_CATEGORIES, type Service } from '../../../data/services'
import styles from './Services.module.css'

/** Desktop services grouped by category with included-item dropdowns. */
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
      {/* --- Category groups --- */}
      <div className={styles.groups}>
        {SERVICE_CATEGORIES.map((category) => (
          <div key={category.id}>
            <h3 className={styles.groupTitle}>{category.title}</h3>
            <div className={styles.grid}>
              {category.services.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.cardTitle}>{service.title}</div>
        <p className={styles.cardCopy}>{service.description}</p>
        {service.includes ? (
          <details className={styles.dropdown}>
            <summary className={styles.summary}>What&apos;s included</summary>
            <ul className={styles.includes}>
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {service.note ? <p className={styles.note}>{service.note}</p> : null}
          </details>
        ) : null}
      </div>
      <span className={styles.badge}>{service.price}</span>
    </div>
  )
}
