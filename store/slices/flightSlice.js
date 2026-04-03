import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Search form values
  searchParams: {
    departure: '',
    arrival: '',
    date: '',
  },
  // API results
  flights: [],
  // UI state
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  // User preferences
  selectedFlight: null,
  sortBy: 'departure_time', // 'departure_time' | 'airline' | 'duration'
}

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    // Action: update search form fields
    setSearchParams(state, action) {
      // Redux Toolkit uses Immer under the hood
      // You CAN mutate state directly here — it's not actually mutating
      state.searchParams = { ...state.searchParams, ...action.payload }
    },
    // Action: user picks a flight
    selectFlight(state, action) {
      state.selectedFlight = action.payload
    },
    // Action: change sort order
    setSortBy(state, action) {
      state.sortBy = action.payload
    },
    // Actions for API lifecycle
    fetchFlightsStart(state) {
      state.status = 'loading'
      state.error = null
    },
    fetchFlightsSuccess(state, action) {
      state.status = 'succeeded'
      state.flights = action.payload
    },
    fetchFlightsFailure(state, action) {
      state.status = 'failed'
      state.error = action.payload
    },
    clearFlights(state) {
      state.flights = []
      state.status = 'idle'
      state.selectedFlight = null
    }
  }
})

// Export actions (dispatch these in components)
export const {
  setSearchParams,
  selectFlight,
  setSortBy,
  fetchFlightsStart,
  fetchFlightsSuccess,
  fetchFlightsFailure,
  clearFlights
} = flightSlice.actions

// Selectors — compute derived state here, not in components
export const selectFlights = (state) => state.flights.flights
export const selectSearchParams = (state) => state.flights.searchParams
export const selectStatus = (state) => state.flights.status
export const selectError = (state) => state.flights.error
export const selectSortedFlights = (state) => {
  const flights = state.flights.flights
  const sortBy = state.flights.sortBy
  return [...flights].sort((a, b) => {
    if (sortBy === 'airline') return a.airline?.name?.localeCompare(b.airline?.name)
    if (sortBy === 'departure_time') return new Date(a.departure?.scheduled) - new Date(b.departure?.scheduled)
    return 0
  })
}

export default flightSlice.reducer