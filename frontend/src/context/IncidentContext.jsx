import {
  createContext,
  useContext,
  useState
} from 'react'
import { dangerZones } from '../data/dangerZones'

const IncidentContext = createContext()

export function IncidentProvider({ children }) {

  const initialIncidents = dangerZones.map((zone) => ({
    type: 'Zona sospechosa detectada',
    location: zone.name,
    risk: zone.risk,
    time: `Hace ${zone.reports * 3} min`,
  }))

  const [incidents, setIncidents] =
    useState(initialIncidents)

  const addIncident = (incident) => {

    setIncidents((prev) => [
      incident,
      ...prev,
    ])
  }

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        addIncident,
      }}
    >
      {children}
    </IncidentContext.Provider>
  )
}

export function useIncidents() {
  return useContext(IncidentContext)
}