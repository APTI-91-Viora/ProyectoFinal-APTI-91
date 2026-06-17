import {
  createContext,
  useContext,
  useState
} from 'react'

import {
  dangerZones as initialZones
} from '../data/dangerZones'

const DangerContext = createContext()

export function DangerProvider({ children }) {

  const [dangerZones, setDangerZones] =
    useState(initialZones)

  const addDangerZone = (position) => {

    setDangerZones((prev) => {

      const existingZone =
        prev.find((zone) => {

          const latDiff =
            Math.abs(
              zone.position[0] - position[0]
            )

          const lngDiff =
            Math.abs(
              zone.position[1] - position[1]
            )

          return (
            latDiff < 0.002 &&
            lngDiff < 0.002
          )
        })

      if (existingZone) {

        return prev.map((zone) => {

          if (zone === existingZone) {

            return {
              ...zone,
              level:
                Math.min(
                  zone.level + 1,
                  5
                ),
            }
          }

          return zone
        })
      }

      return [
        ...prev,
        {
          position,
          level: 1,
        },
      ]
    })
  }

  return (
    <DangerContext.Provider
      value={{
        dangerZones,
        addDangerZone,
      }}
    >
      {children}
    </DangerContext.Provider>
  )
}

export function useDanger() {
  return useContext(DangerContext)
}