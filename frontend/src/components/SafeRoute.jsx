import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'

import { useRoute } from '../context/RouteContext'

function SafeRoute() {

  const map = useMap()

  const { selectedRoute } = useRoute()

  useEffect(() => {

    const routingControl = L.Routing.control({

      waypoints: [
        L.latLng(21.5085, -104.8950),
        L.latLng(
          selectedRoute.position[0],
          selectedRoute.position[1]
        ),
      ],

      routeWhileDragging: false,

      addWaypoints: false,

      draggableWaypoints: false,

      fitSelectedRoutes: false,

      show: false,

      lineOptions: {
        styles: [
          {
            color: '#00E676',
            weight: 6,
          },
        ],
      },

    }).addTo(map)

    return () => map.removeControl(routingControl)

  }, [map, selectedRoute])

  return null
}

export default SafeRoute