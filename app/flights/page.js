'use client' // Needs Redux to read flight results

import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import {
  selectSortedFlights,
  selectStatus,
  selectError,
  selectSearchParams,
  setSortBy,
  clearFlights
} from '../../store/slices/flightSlice'
import { FlightCard } from '../../components/FlightCard/FlightCard'
import { SearchForm } from '../../components/SearchForm/SearchForm'
import styles from './flights.module.css'

export default function FlightsPage() {
  const flights = useSelector(selectSortedFlights)
  const status = useSelector(selectStatus)
  const error = useSelector(selectError)
  const searchParams = useSelector(selectSearchParams)
  const dispatch = useDispatch()
  const router = useRouter()

  if (status === 'idle') {
    // User landed here directly without searching
    return (
      <div className={styles.container}>
        <SearchForm />
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className={styles.container} role="status" aria-live="polite">
        <div className={styles.loading}>
          <div className={styles.spinner} aria-hidden="true" />
          <p>Searching flights from {searchParams.departure} to {searchParams.arrival}…</p>
        </div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className={styles.container}>
        <div className={styles.error} role="alert">
          <h2>Search Failed</h2>
          <p>{error}</p>
          <button onClick={() => { dispatch(clearFlights()); router.push('/') }}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {searchParams.departure} → {searchParams.arrival}
          </h1>
          <p className={styles.count}>
            {flights.length} flight{flights.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className={styles.controls}>
          <label htmlFor="sort" className={styles.sortLabel}>Sort by:</label>
          <select
            id="sort"
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className={styles.select}
          >
            <option value="departure_time">Departure time</option>
            <option value="airline">Airline</option>
          </select>
          <button
            className={styles.newSearch}
            onClick={() => { dispatch(clearFlights()); router.push('/') }}
          >
            New search
          </button>
        </div>
      </div>

      {flights.length === 0 ? (
        <div className={styles.empty} role="status">
          <p>No flights found for this route. Try different airports.</p>
        </div>
      ) : (
        <ul className={styles.grid} aria-label="Flight results">
          {flights.map((flight, index) => (
            <li key={`${flight.id}-${index}`}>
              <FlightCard flight={flight} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
