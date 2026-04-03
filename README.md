# SkyRoute

SkyRoute is a JavaScript-only Next.js App Router project for building a flight search experience with React and Redux.

**Goals**

1. Clear app structure for app router pages, API routes, UI components, and state.
2. Simple, predictable data flow using Redux Toolkit.
3. Easy swap-in for real aviation APIs later.

**Stack**

1. Next.js (App Router)
2. React
3. Redux Toolkit + React Redux

**Project Structure**

1. `app/` routes, layouts, and API handlers
2. `components/` reusable UI blocks
3. `store/` Redux store, providers, and slices
4. `lib/` API helpers and utilities

**Architecture**

1. UI components dispatch actions or call helpers
2. Redux slice handles async fetching and state
3. API route in `app/api/flights` returns data
4. Pages read state via selectors and render lists

**Key Concepts**

1. App Router for file-based routing and layouts
2. Client components for interactive state
3. Redux for shared state and async flows
4. API routes for backend logic

**Best Practices**

1. Keep UI components presentational and small
2. Put async logic in slices or helpers, not pages
3. Use predictable keys for list rendering
4. Keep API response shapes stable

**Planning**

1. Start with mock data and UI flow
2. Lock in API contract and query params
3. Add validation and error states
4. Replace mock API with real provider

**Setup Plan**

1. Install Node.js (LTS) and a package manager (npm comes with Node).
2. Install project dependencies: `npm install`
3. Run the dev server: `npm run dev`
4. Open `http://localhost:3000` in your browser.
5. Update `.env.local` when connecting a real API.

**Scripts**

```bash
npm run dev
npm run build
npm run start
npm run lint
```
