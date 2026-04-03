const BASE_URL = 'http://api.aviationstack.com/v1'
const API_KEY = process.env.NEXT_PUBLIC_AVIATION_API_KEY

// Normalise the raw API response into a clean shape
// This protects your components from API changes
function normaliseFlights(rawData) {
  if (!rawData?.data) return []
  return rawData.data.map((flight) => ({
    id: flight.flight?.iata || Math.random().toString(36),
    airline: {
      name: flight.airline?.name || 'Unknown Airline',
      iata: flight.airline?.iata || '??',
    },
    flight: {
      number: flight.flight?.number || 'N/A',
      iata: flight.flight?.iata || 'N/A',
    },
    departure: {
      airport: flight.departure?.airport || 'Unknown',
      iata: flight.departure?.iata || '???',
      scheduled: flight.departure?.scheduled || null,
      terminal: flight.departure?.terminal || null,
    },
    arrival: {
      airport: flight.arrival?.airport || 'Unknown',
      iata: flight.arrival?.iata || '???',
      scheduled: flight.arrival?.scheduled || null,
      terminal: flight.arrival?.terminal || null,
    },
    status: flight.flight_status || 'unknown',
  }))
}

export async function searchFlights({ departure, arrival, limit = 20 }) {
  const params = new URLSearchParams({
    access_key: API_KEY,
    dep_iata: departure.toUpperCase(),
    arr_iata: arrival.toUpperCase(),
    limit,
  })

  const res = await fetch(`${BASE_URL}/flights?${params}`, {
    // Next.js extends fetch with caching options
    next: { revalidate: 300 }, // Cache for 5 minutes (ISR)
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  const data = await res.json()
  return normaliseFlights(data)
}