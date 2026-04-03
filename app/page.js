import { SearchForm } from '../components/SearchForm/SearchForm'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroText}>
        <h1>Explore the World's<br />Flight Routes</h1>
        <p>Real-time flight data at your fingertips</p>
      </div>
      <SearchForm />
    </div>
  )
}