import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import {
  RouteProvider
} from './context/RouteContext'

import {
  SettingsProvider,
  useSettings
} from './context/SettingsContext'

import {
  IncidentProvider
} from './context/IncidentContext'

import {
  DangerProvider
} from './context/DangerContext'

import { useEffect, useState } from 'react'

import Home from './pages/Home'
import RoutesPage from './pages/Routes'
import Incidents from './pages/Incidents'
import Settings from './pages/Settings'
import Auth from './pages/Auth'

import Navbar from './components/Navbar'
import SplashScreen from './components/SplashScreen'

function AppContent() {

  const { darkMode } = useSettings()

  const [loading, setLoading] =
    useState(true)

  const [isAuthenticated, setIsAuthenticated] =
    useState(false)

  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false)

      const currentUser =
        localStorage.getItem('safeCurrentUser')

      if (currentUser) {
        setIsAuthenticated(true)
      }

    }, 2500)

    return () => clearTimeout(timer)

  }, [])

  // SPLASH
  if (loading) {
    return <SplashScreen />
  }

  // LOGIN
  if (!isAuthenticated) {

    return (
      <Auth
        onLoginSuccess={() =>
          setIsAuthenticated(true)
        }
      />
    )
  }

  // APP
  return (

    <div
      className={
        darkMode
          ? 'bg-zinc-950 text-white'
          : 'bg-zinc-100 text-black'
      }
    >

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/routes"
            element={<RoutesPage />}
          />

          <Route
            path="/incidents"
            element={<Incidents />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Routes>

        <Navbar />

      </BrowserRouter>

    </div>
  )
}

function App() {

  return (
    <IncidentProvider>

      <SettingsProvider>

        <DangerProvider>

          <RouteProvider>

            <AppContent />

          </RouteProvider>

        </DangerProvider>

      </SettingsProvider>

    </IncidentProvider>
  )
}

export default App