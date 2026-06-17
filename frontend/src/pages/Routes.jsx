import { useRoute } from '../context/RouteContext'
import { useSettings } from '../context/SettingsContext'
import { useState } from 'react'

import {
  Shield,
  Clock3,
  MapPin,
  TriangleAlert
} from 'lucide-react'

import PageTransition from '../components/PageTransition'

import {
  calculateRisk
} from '../utils/riskCalculator'

function Routes() {
  const { darkMode } = useSettings()
  const [search, setSearch] = useState('')

  const pageBg = darkMode
    ? 'bg-[#050505] text-white'
    : `
      bg-gradient-to-br
      from-zinc-100
      via-pink-50
      to-zinc-200
      text-zinc-900
    `

  const cardBg = darkMode
    ? `
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      shadow-[0_8px_32px_rgba(0,0,0,0.35)]
    `
    : `
      bg-white/70
      backdrop-blur-xl
      border border-white/40
      shadow-[0_8px_32px_rgba(0,0,0,0.08)]
    `

  const {
    routes,
    selectedRoute,
    setSelectedRoute,
  } = useRoute()

  return (
    <PageTransition className="h-full overflow-y-auto">
      <div
        className={`
        min-h-screen
        ${pageBg}
        p-6
        pb-36
        overflow-y-auto
      `}
      >

        <div>

          <p
            className={`
              text-sm
              uppercase
              tracking-[0.25em]
              mb-2

              ${darkMode
                ? 'text-pink-400'
                : 'text-pink-500'}
            `}
          >
            Navegación Inteligente
          </p>

          <h1
            className={`
              text-5xl
              font-black
              tracking-tight
              leading-[1.15]
              pb-1
              

              ${darkMode
                ? `
                  bg-gradient-to-r
                  from-white
                  via-pink-200
                  to-pink-400
                  bg-clip-text
                  text-transparent
                `
                : `
                  bg-gradient-to-r
                  from-zinc-900
                  via-pink-700
                  to-pink-500
                  bg-clip-text
                  text-transparent
                `}
            `}
          >
            Rutas Seguras
          </h1>

        </div>

        <div className="mt-6">

          <div className="relative">

            <input
              type="text"
              placeholder="Buscar destino..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className={`
                w-full
                p-5
                pl-14
                rounded-3xl
                outline-none
                transition-all
                duration-300

                backdrop-blur-xl

                ${darkMode
                  ? `
                    bg-white/5
                    border
                    border-white/10
                    text-white
                    placeholder:text-zinc-500

                    focus:border-pink-500/40
                    focus:bg-white/10
                  `
                  : `
                    bg-white/70
                    border
                    border-white/60
                    text-zinc-900
                    placeholder:text-zinc-500

                    shadow-[0_8px_30px_rgba(0,0,0,0.08)]

                    focus:border-pink-400/40
                    focus:bg-white
                  `}
              `}
            />

            <MapPin
              size={20}
              className={`
                absolute
                left-5
                top-1/2
                -translate-y-1/2

                ${darkMode
                  ? 'text-zinc-500'
                  : 'text-zinc-400'}
              `}
            />

          </div>

        </div>

        <div className="mt-6 space-y-6">

          {routes
            .filter((route) =>
              route.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((route) => {

              const active =
                selectedRoute.id === route.id

              const {
                safety,
                risk,
              } = calculateRisk(
                route.position
              )

              return (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`
                    group
                    relative
                    overflow-hidden

                    w-full
                    p-6
                    rounded-[28px]
                    text-left

                    transition-all
                    duration-500

                    hover:scale-[1.02]
                    active:scale-[0.98]

                    border

                    ${active
                      ? `
                        border-pink-500/40
                        bg-pink-500/15

                        shadow-[0_0_35px_rgba(236,72,153,0.18)]
                      `
                      : `${cardBg}`
                    }
                  `}
                >

                  {/* Glow */}
                  <div
                    className="
                      absolute
                      inset-0
                      opacity-0
                      group-hover:opacity-100
                      transition-all
                      duration-500

                      bg-gradient-to-r
                      from-pink-500/5
                      via-transparent
                      to-pink-500/5
                    "
                  />

                  <div className="relative">

                    {/* TOP */}
                    <div className="flex justify-between items-start gap-4">

                      <div>

                        <h2
                          className={`
                            text-2xl
                            font-bold
                            tracking-tight

                            ${darkMode
                              ? 'text-white'
                              : 'text-zinc-900'}
                          `}
                        >
                          {route.name}
                        </h2>

                        <div className="flex items-center gap-2 mt-2">

                          <Clock3
                            size={15}
                            className="text-zinc-400"
                          />

                          <p className="text-sm text-zinc-400">
                            {route.time}
                          </p>

                        </div>

                      </div>

                      {/* SCORE */}
                      <div
                        className={`
                          px-4
                          py-2
                          rounded-2xl
                          border
                          backdrop-blur-xl

                          ${safety >= 80
                            ? `
                              bg-emerald-400/15
                              border-emerald-500/20
                              text-emerald-500
                            `
                            : safety >= 60
                              ? `
                                bg-yellow-400/15
                                border-yellow-500/20
                                text-yellow-500
                              `
                              : `
                                bg-red-400/15
                                border-red-500/20
                                text-red-500
                              `
                          }
                        `}
                      >

                        <div className="flex items-center gap-2">

                          <Shield size={16} />

                          <span className="font-bold">
                            {safety}%
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* BOTTOM */}
                    <div className="mt-5 flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <TriangleAlert
                          size={16}
                          className={
                            risk === 'ALTO'
                              ? 'text-red-500'
                              : risk === 'MEDIO'
                                ? 'text-yellow-500'
                                : 'text-green-500'
                          }
                        />

                        <span
                          className={`
                            text-sm
                            font-semibold

                            ${risk === 'ALTO'
                              ? 'text-red-500'
                              : risk === 'MEDIO'
                                ? 'text-yellow-500'
                                : 'text-green-500'}
                          `}
                        >
                          Riesgo {risk}
                        </span>

                      </div>

                      {active && (
                        <div
                          className="
                            px-3
                            py-1
                            rounded-full

                            bg-pink-700/20
                            border
                            border-pink-500/20

                            text-pink-800
                            text-xs
                            font-bold

                            animate-pulse
                          "
                        >
                          ACTIVA
                        </div>
                      )}

                    </div>

                  </div>

                </button>
              )
            })}

        </div>

      </div>
    </PageTransition>
  )
}

export default Routes