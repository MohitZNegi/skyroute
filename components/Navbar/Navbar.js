// No 'use client' needed — purely presentational, no state
import Link from 'next/link'
import styles from './Navbar.module.css'

export function Navbar() {
  return (
    <header className={styles.header} role="banner">
      {/* Accessibility: skip navigation link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="SkyRoute home">
          ✈ SkyRoute
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/flights" className={styles.navLink}>Search Flights</Link>
        </nav>
      </div>
    </header>
  )
}