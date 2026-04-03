export const NZ_AIRPORTS = [
  { iata: 'AKL', name: 'Auckland',           full: 'Auckland International' },
  { iata: 'WLG', name: 'Wellington',         full: 'Wellington International' },
  { iata: 'CHC', name: 'Christchurch',       full: 'Christchurch International' },
  { iata: 'ZQN', name: 'Queenstown',         full: 'Queenstown Airport' },
  { iata: 'DUD', name: 'Dunedin',            full: 'Dunedin International' },
  { iata: 'HLZ', name: 'Hamilton',           full: 'Hamilton Airport' },
  { iata: 'NPE', name: 'Napier',             full: "Hawke's Bay Airport" },
  { iata: 'PMR', name: 'Palmerston North',   full: 'Palmerston North Airport' },
  { iata: 'NSN', name: 'Nelson',             full: 'Nelson Airport' },
  { iata: 'IVC', name: 'Invercargill',       full: 'Invercargill Airport' },
  { iata: 'ROT', name: 'Rotorua',            full: 'Rotorua Regional' },
  { iata: 'NPL', name: 'New Plymouth',       full: 'New Plymouth Airport' },
]

// Pre-built popular NZ domestic routes
export const NZ_POPULAR_ROUTES = [
  { from: 'AKL', to: 'WLG', label: 'Auckland → Wellington' },
  { from: 'AKL', to: 'CHC', label: 'Auckland → Christchurch' },
  { from: 'AKL', to: 'ZQN', label: 'Auckland → Queenstown' },
  { from: 'WLG', to: 'CHC', label: 'Wellington → Christchurch' },
  { from: 'CHC', to: 'ZQN', label: 'Christchurch → Queenstown' },
]

// Trans-Tasman & Pacific routes Air NZ operates
export const INTERNATIONAL_ROUTES = [
  { from: 'AKL', to: 'SYD', label: 'Auckland → Sydney' },
  { from: 'AKL', to: 'MEL', label: 'Auckland → Melbourne' },
  { from: 'AKL', to: 'LAX', label: 'Auckland → Los Angeles' },
  { from: 'AKL', to: 'LHR', label: 'Auckland → London' },
  { from: 'AKL', to: 'SIN', label: 'Auckland → Singapore' },
]