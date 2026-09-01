import { useEffect, type ReactNode } from 'react'
import { useIsMobile } from '../../../hooks/useIsMobile'
import { setPageMeta } from '../../../lib/seo'
import { Footer as DesktopFooter } from '../../desktop/Footer/Footer'
import { Header as DesktopHeader } from '../../desktop/Header/Header'
import { Footer as MobileFooter } from '../../mobile/Footer/Footer'
import { Header as MobileHeader } from '../../mobile/Header/Header'
import styles from './LegalPageLayout.module.css'

type LegalPageLayoutProps = {
  title: string
  description: string
  path: string
  effectiveDate: string
  children: ReactNode
}

/** Shared article shell for legal documents. Reuses viewport Header/Footer. */
export function LegalPageLayout({
  title,
  description,
  path,
  effectiveDate,
  children,
}: LegalPageLayoutProps) {
  const isMobile = useIsMobile()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setPageMeta({ title, description, path })
  }, [title, description, path])

  return (
    <div className={isMobile ? `${styles.root} mobile` : styles.root}>
      {isMobile ? <MobileHeader homeHref="/" /> : <DesktopHeader homeHref="/" />}
      <main>
        <article className={styles.article}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.effectiveDate}>Effective date: {effectiveDate}</p>
          <div className={styles.body}>{children}</div>
        </article>
      </main>
      {isMobile ? <MobileFooter /> : <DesktopFooter />}
    </div>
  )
}
