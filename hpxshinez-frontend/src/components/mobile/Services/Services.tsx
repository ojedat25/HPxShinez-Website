import { SQUARE_SERVICE_WIDGETS } from '../../../data/booking'
import { SERVICE_CATEGORIES, type Service } from '../../../data/services'
import styles from './Services.module.css'

/** Mobile services grouped by category with included-item dropdowns. */
export function Services() {
  return (
    <section id="services" className={styles.section}>
      {/* --- Header --- */}
      <h2 className={styles.title}>Services</h2>
      {/* --- Category groups --- */}
      <div className={styles.groups}>
        {SERVICE_CATEGORIES.map((category) => (
          <div key={category.id}>
            <h3 className={styles.groupTitle}>{category.title}</h3>
            <div className={styles.grid}>
              {category.services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const widgetUrl = SQUARE_SERVICE_WIDGETS[service.id]

  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.cardTitle}>{service.title}</div>
        <p className={styles.cardCopy}>{service.description}</p>
        {!service.includes && service.note ? (
          <p className={styles.note}>{service.note}</p>
        ) : null}
        {service.includes ? (
          <details className={styles.dropdown}>
            <summary className={styles.summary}>What's included</summary>
            <ul className={styles.includes}>
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {service.note ? <p className={styles.note}>{service.note}</p> : null}
          </details>
        ) : null}
      </div>
      <div className={styles.cardFooter}>
        {widgetUrl ? (
          <a href={widgetUrl} className={styles.book}>
            Book
          </a>
        ) : null}
        <span className={styles.badge}>{service.price}</span>
      </div>
    </div>
  )
}
