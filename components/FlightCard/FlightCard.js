'use client'

import { useDispatch, useSelector } from 'react-redux'
import { selectFlight } from '../../store/slices/flightSlice'
import styles from './FlightCard.module.css'

function formatTime(isoString) {
  if (!isoString) return 'N/A'
  return new Date(isoString).toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

const STATUS_LABELS = {
  active: { label: 'In Air', className: 'statusActive' },
  scheduled: { label: 'Scheduled', className: 'statusScheduled' },
  landed: { label: 'Landed', className: 'statusLanded' },
  cancelled: { label: 'Cancelled', className: 'statusCancelled' },
  unknown: { label: 'Unknown', className: 'statusUnknown' },
}

export function FlightCard({ flight }) {
  const dispatch = useDispatch()
  const selectedFlight = useSelector((state) => state.flights.selectedFlight)
  const isSelected = selectedFlight?.id === flight.id

  const status = STATUS_LABELS[flight.status] || STATUS_LABELS.unknown

  function handleSelect() {
    dispatch(selectFlight(isSelected ? null : flight))
  }

  return (
    <article
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={handleSelect}
      // Accessibility: make it keyboard accessible
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleSelect() : null}
      aria-pressed={isSelected}
      aria-label={`Flight ${flight.flight.iata} from ${flight.departure.iata} to ${flight.arrival.iata}`}
    >
      <div className={styles.top}>
        <span className={styles.airline}>{flight.airline.name}</span>
        <span className={`${styles.status} ${styles[status.className]}`}>
          {status.label}
        </span>
      </div>

      <div className={styles.route}>
        <div className={styles.airport}>
          <span className={styles.iata}>{flight.departure.iata}</span>
          <span className={styles.time}>{formatTime(flight.departure.scheduled)}</span>
          <span className={styles.airportName}>{flight.departure.airport}</span>
        </div>

        <div className={styles.flightLine} aria-hidden="true">
          <span className={styles.flightNumber}>{flight.flight.iata}</span>
          <div className={styles.line}>
            <span>✈</span>
          </div>
        </div>

        <div className={`${styles.airport} ${styles.right}`}>
          <span className={styles.iata}>{flight.arrival.iata}</span>
          <span className={styles.time}>{formatTime(flight.arrival.scheduled)}</span>
          <span className={styles.airportName}>{flight.arrival.airport}</span>
        </div>
      </div>

      {isSelected && flight.departure.terminal && (
        <div className={styles.detail} role="region" aria-label="Flight details">
          <span>Terminal: {flight.departure.terminal}</span>
        </div>
      )}
    </article>
  )
}