'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import {
  setSearchParams, selectSearchParams,
  fetchFlightsStart, fetchFlightsSuccess,
  fetchFlightsFailure, selectStatus
} from '../../store/slices/flightSlice'
import { NZ_AIRPORTS, NZ_POPULAR_ROUTES, INTERNATIONAL_ROUTES } from '../../lib/nzAirports'
import styles from './SearchForm.module.css'

export function SearchForm() {
  const dispatch = useDispatch()
  const router   = useRouter()
  const searchParams = useSelector(selectSearchParams)
  const status       = useSelector(selectStatus)
  const isLoading    = status === 'loading'

  function handleChange(e) {
    dispatch(setSearchParams({ [e.target.name]: e.target.value.toUpperCase() }))
  }

  // Fill both fields from a pre-built route
  function applyRoute(from, to) {
    dispatch(setSearchParams({ departure: from, arrival: to }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { departure, arrival } = searchParams
    if (!departure || !arrival) return

    dispatch(fetchFlightsStart())
    try {
      const res  = await fetch(`/api/flights?departure=${departure}&arrival=${arrival}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      dispatch(fetchFlightsSuccess(data.flights))
      router.push('/flights')
    } catch (err) {
      dispatch(fetchFlightsFailure(err.message))
      router.push('/flights')
    }
  }

  return (
    <section className={styles.section} aria-labelledby="search-heading">
      <h2 id="search-heading" className={styles.heading}>Search Flights</h2>
      <p className={styles.subheading}>Enter airport codes or pick a popular route below</p>

      <form onSubmit={handleSubmit} className={styles.form} noValidate aria-label="Flight search form">
        {/* Departure — dropdown of NZ airports */}
        <div className={styles.inputGroup}>
          <label htmlFor="departure" className={styles.label}>From</label>
          <select
            id="departure"
            name="departure"
            value={searchParams.departure}
            onChange={handleChange}
            className={styles.select}
            aria-describedby="departure-hint"
            required
          >
            <option value="">Select airport…</option>
            <optgroup label="New Zealand">
              {NZ_AIRPORTS.map(a => (
                <option key={a.iata} value={a.iata}>{a.iata} — {a.name}</option>
              ))}
            </optgroup>
            <optgroup label="Or type your own IATA code below" />
          </select>
          {/* Also allow manual IATA entry for international */}
          <input
            name="departure"
            type="text"
            value={searchParams.departure}
            onChange={handleChange}
            placeholder="or type e.g. SYD"
            maxLength={3}
            className={styles.inputSmall}
            aria-label="Or type departure IATA code"
            autoComplete="off"
          />
          <span id="departure-hint" className={styles.hint}>3-letter IATA code</span>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="arrival" className={styles.label}>To</label>
          <select
            id="arrival"
            name="arrival"
            value={searchParams.arrival}
            onChange={handleChange}
            className={styles.select}
            aria-describedby="arrival-hint"
            required
          >
            <option value="">Select airport…</option>
            <optgroup label="New Zealand">
              {NZ_AIRPORTS.map(a => (
                <option key={a.iata} value={a.iata}>{a.iata} — {a.name}</option>
              ))}
            </optgroup>
          </select>
          <input
            name="arrival"
            type="text"
            value={searchParams.arrival}
            onChange={handleChange}
            placeholder="or type e.g. LAX"
            maxLength={3}
            className={styles.inputSmall}
            aria-label="Or type arrival IATA code"
            autoComplete="off"
          />
          <span id="arrival-hint" className={styles.hint}>3-letter IATA code</span>
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

      {/* NZ domestic quick-routes */}
      <div className={styles.routeGroup}>
        <p className={styles.routeLabel}>🇳🇿 Domestic</p>
        <div className={styles.chips}>
          {NZ_POPULAR_ROUTES.map(r => (
            <button
              key={r.label}
              type="button"
              className={styles.chip}
              onClick={() => applyRoute(r.from, r.to)}
              aria-label={`Search ${r.label}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* International quick-routes */}
      <div className={styles.routeGroup}>
        <p className={styles.routeLabel}>🌏 International</p>
        <div className={styles.chips}>
          {INTERNATIONAL_ROUTES.map(r => (
            <button
              key={r.label}
              type="button"
              className={styles.chip}
              onClick={() => applyRoute(r.from, r.to)}
              aria-label={`Search ${r.label}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}