import { configureStore } from '@reduxjs/toolkit'
import flightReducer from './slices/flightSlice'

export const store = configureStore({
  reducer: {
    flights: flightReducer,
    // Add more slices here as the app grows
  },
  // Redux DevTools is enabled automatically in development
})