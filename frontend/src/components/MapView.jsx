import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle
} from 'react-leaflet'

import { useEffect, useState } from 'react'
import { useSettings } from '../context/SettingsContext'

import {
  useDanger
} from '../context/DangerContext'

import SafeRoute from './SafeRoute'
import L from 'leaflet'
import LocateButton from './LocateButton'

function MapView() {
  const [position, setPosition] = useState([21.5085, -104.8950])
  const { darkMode, setDarkMode } = useSettings()
  const { dangerZones } = useDanger()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([
          pos.coords.latitude,
          pos.coords.longitude
        ])
      },
      (err) => {
        console.log(err)
      }
    )
  }, [])

  return (
    <MapContainer
      center={position}
      zoom={14}
      preferCanvas={true}
      minZoom={3}

      maxBounds={[
        [-90, -180],
        [90, 180]
      ]}

      maxBoundsViscosity={1.0}
      worldCopyJump={false}
      fadeAnimation={true}
      zoomAnimation={true}
      markerZoomAnimation={true}

      style={{ height: '100vh', width: '100%' }}
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        noWrap={true}
        url={
          darkMode
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
      />

      <Marker position={position} icon={gpsIcon}>
        <Popup>
          Tu ubicación actual
        </Popup>
      </Marker>

      {dangerZones.map((zone, index) => {

        const colors = {
          1: '#FFA500',
          2: '#FF8800',
          3: '#FF5500',
          4: '#FF2200',
          5: '#FF0000',
        }

        return (
          <Circle
            key={index}
            center={zone.position}
            radius={250 + ((zone.level || 1) * 50)}
            pathOptions={{
              color: colors[zone.level] || '#FFA500',
              fillColor: colors[zone.level] || '#FFA500',
              fillOpacity: 0.35,
            }}
          >
            <Popup>

              <div>

                <h2 style={{ margin: 0 }}>
                  Zona de Riesgo
                </h2>

                <p>
                  Nivel: {zone.level}/5
                </p>

                <p>
                  Reportes SOS detectados
                </p>

              </div>

            </Popup>

          </Circle>
        )
      })}

      <SafeRoute />
      <LocateButton position={position} />
      <div
        className="
        absolute
        top-6
        right-6
        z-[9999]
        "
      >
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="
          bg-black/70
          hover:bg-black
          text-white
          px-5
          py-3
          rounded-2xl
          backdrop-blur-xl
          border
          border-white/10
          shadow-2xl
          transition-all
          duration-300
          hover:scale-[1.03]
          active:scale-95
          "
        >
          {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>
      </div>
    </MapContainer>
  )
}

const gpsIcon = L.divIcon({
  className: '',
  html: `
    <div class="gps-marker">
      <div class="gps-pulse"></div>
      <div class="gps-dot"></div>
    </div>
    `,
  iconSize: [40, 40],
})

export default MapView