import { Providers } from '../store/providers'
import { Navbar } from '../components/Navbar/Navbar'
import './globals.css'

export const metadata = {
  title: 'SkyRoute – Flight Explorer',
  description: 'Search and explore flight routes worldwide',
}

// This is a SERVER component (default in App Router)
// It runs on the server — no useState, no useEffect here
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Providers wraps Redux store around the entire app */}
        <Providers>
          <Navbar />
          <main id="main-content">   {/* Accessibility: skip link target */}
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}