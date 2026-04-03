// This runs on the server — keeps your API key secret

import { searchFlights } from '../../../lib/aviationApi'
import { NextResponse } from 'next/server'

// Handles GET /api/flights?departure=JFK&arrival=LAX
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const departure = searchParams.get('departure')
  const arrival = searchParams.get('arrival')

  // Validate inputs
  if (!departure || !arrival) {
    return NextResponse.json(
      { error: 'departure and arrival are required' },
      { status: 400 }
    )
  }

  if (departure.length !== 3 || arrival.length !== 3) {
    return NextResponse.json(
      { error: 'Use 3-letter IATA codes e.g. JFK, LAX, SYD' },
      { status: 400 }
    )
  }

  try {
    const flights = await searchFlights({ departure, arrival })
    return NextResponse.json({ flights, count: flights.length })
  } catch (err) {
    console.error('Flight search error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch flights. Try again.' },
      { status: 500 }
    )
  }
}