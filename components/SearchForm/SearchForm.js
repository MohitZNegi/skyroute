'use client' // Needs state + Redux

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import {
  setSearchParams,
  selectSearchParams,
  fetchFlightsStart,
  fetchFlightsSuccess,
  fetchFlightsFailure,
  selectStatus
} from '../../store/slices/flightSlice'
import styles from './SearchForm.module.css'

// Popular airports for quick suggestions
const POPULAR_AIRPORTS = [
  { iata: 'JFK', name: 'New York JFK' },
  { iata: 'LAX', name: 'Los Angeles' },
  { iata: 'LHR', name: 'London Heathrow' },
  { iata: 'SYD', name: 'Sydney' },
  { iata: 'DXB', name: 'Dubai' },
  { iata: 'NRT', name: 'Tokyo Narita' },
]

export function SearchForm() {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSelector(selectSearchParams)
  const status = useSelector(selectStatus)

  const isLoading = status === 'loading'

  function handleChange(e) {
    dispatch(setSearchParams({ [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { departure, arrival } = searchParams

    if (!departure || !arrival) return

    dispatch(fetchFlightsStart())

    try {
      // Calls our own API route — not the external API directly
      const res = await fetch(
        `/api/flights?departure=${departure}&arrival=${arrival}`
      )
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      dispatch(fetchFlightsSuccess(data.flights))
      // Navigate to results page after successful search
      router.push('/flights')
    } catch (err) {
      dispatch(fetchFlightsFailure(err.message))
      router.push('/flights') // Still navigate to show the error
    }
  }

  return (
    <section className={styles.section} aria-labelledby="search-heading">
      <h2 id="search-heading" className={styles.heading}>
        Find Your Flight
      </h2>
      <p className={styles.subheading}>
        Enter 3-letter IATA codes (e.g. JFK, LAX, SYD)
      </p>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
        noValidate
        aria-label="Flight search form"
      >
        <div className={styles.inputGroup}>
          <label htmlFor="departure" className={styles.label}>
            From
          </label>
          <input
            id="departure"
            name="departure"
            type="text"
            value={searchParams.departure}
            onChange={handleChange}
            placeholder="JFK"
            maxLength={3}
            className={styles.input}
            aria-describedby="departure-hint"
            required
            autoComplete="off"
          />
          <span id="departure-hint" className={styles.hint}>
            3-letter airport code
          </span>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="arrival" className={styles.label}>
            To
          </label>
          <input
            id="arrival"
            name="arrival"
            type="text"
            value={searchParams.arrival}
            onChange={handleChange}
            placeholder="LAX"
            maxLength={3}
            className={styles.input}
            aria-describedby="arrival-hint"
            required
            autoComplete="off"
          />
          <span id="arrival-hint" className={styles.hint}>
            3-letter airport code
          </span>
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={isLoading || !searchParams.departure || !searchParams.arrival}
          aria-busy={isLoading}
        >
          {isLoading ? 'Searching…' : 'Search Flights'}
        </button>
      </form>

      {/* Popular routes quick-select */}
      <div className={styles.suggestions} role="group" aria-label="Popular airports">
        <p className={styles.suggestLabel}>Popular airports:</p>
        {POPULAR_AIRPORTS.map((airport) => (
          <button
            key={airport.iata}
            type="button"
            className={styles.chip}
            onClick={() => dispatch(setSearchParams({ departure: airport.iata }))}
            aria-label={`Set departure to ${airport.name}`}
          >
            {airport.iata}
          </button>
        ))}
      </div>
    </section>
  )
}