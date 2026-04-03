import Link from 'next/link'
import styles from './Navbar.module.css'

export function Navbar() {
  return (
    <header className={styles.header} role="banner">
      <a href="#main-content" className={styles.skipLink}>Skip to main content</a>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="SkyRoute home">
          {/* Koru-inspired mark */}
          <span className={styles.koruDot} aria-hidden="true" />
          <span>SkyRoute</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/flights" className={styles.navLink}>Search Flights</Link>
        </nav>
      </div>
    </header>
  )
}