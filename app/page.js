// app/page.js
import { SearchForm } from '../components/SearchForm/SearchForm'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>New Zealand & beyond</p>
          <h1 className={styles.headline}>
            Where do you<br />want to fly?
          </h1>
          <p className={styles.sub}>
            Real-time flight data across Air New Zealand's domestic and international network.
          </p>
        </div>
      </div>
      <SearchForm />
    </>
  )
}