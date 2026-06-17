import { createContext, useContext, useState } from 'react'

const RouteContext = createContext()

export function RouteProvider({ children }) {

  const routes = [

    {
      id: 1,
      name: 'Centro de Tepic',
      position: [21.5095, -104.8955],
      safety: 82,
      time: '12 min',
    },

    {
      id: 2,
      name: 'Forum Tepic',
      position: [21.5010, -104.8930],
      safety: 91,
      time: '8 min',
    },

    {
      id: 3,
      name: 'Universidad Tecnológica',
      position: [21.4765, -104.8660],
      safety: 74,
      time: '18 min',
    },

    {
      id: 4,
      name: 'Plaza Cigarrera',
      position: [21.5077, -104.8825],
      safety: 79,
      time: '10 min',
    },

    {
      id: 5,
      name: 'Ciudad del Valle',
      position: [21.4948, -104.8780],
      safety: 88,
      time: '7 min',
    },

    {
      id: 6,
      name: 'La Loma',
      position: [21.5044, -104.8815],
      time: '9 min',
    },

    {
      id: 7,
      name: 'Soriana Cigarrera',
      position: [21.5059, -104.8842],
      time: '11 min',
    },

    {
      id: 8,
      name: 'IMSS Tepic',
      position: [21.5008, -104.9001],
      time: '15 min',
    },

    {
      id: 9,
      name: 'Universidad Autónoma de Nayarit',
      position: [21.4802, -104.8669],
      time: '17 min',
    },

    {
      id: 10,
      name: 'Plaza Fórum Cinema',
      position: [21.5000, -104.8920],
      time: '8 min',
    },

  ]

  const [selectedRoute, setSelectedRoute] =
    useState(routes[0])

  return (
    <RouteContext.Provider
      value={{
        routes,
        selectedRoute,
        setSelectedRoute,
      }}
    >
      {children}
    </RouteContext.Provider>
  )
}

export function useRoute() {
  return useContext(RouteContext)
}