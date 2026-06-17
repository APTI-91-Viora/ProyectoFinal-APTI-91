import {
  House,
  Route,
  TriangleAlert,
  Settings
} from 'lucide-react'

import {
  Link,
  useLocation
} from 'react-router-dom'

import {
  useSettings
} from '../context/SettingsContext'

function Navbar() {

  const location = useLocation()

  const { darkMode } = useSettings()

  const navItems = [
    {
      path: '/',
      icon: <House size={22} />,
      label: 'Inicio',
    },
    {
      path: '/routes',
      icon: <Route size={22} />,
      label: 'Rutas',
    },
    {
      path: '/incidents',
      icon: <TriangleAlert size={22} />,
      label: 'Alertas',
    },
    {
      path: '/settings',
      icon: <Settings size={22} />,
      label: 'Ajustes',
    },
  ]

  return (

    <div
      className="
        fixed
        bottom-5
        left-1/2
        -translate-x-1/2
        z-[99999]

        w-[92%]
        max-w-md
      "
    >

      <div
        className={`
          relative

          flex
          justify-around
          items-center

          px-3
          py-3

          rounded-[2rem]

          backdrop-blur-2xl

          border

          shadow-2xl

          transition-all
          duration-300

          ${darkMode
            ? `
              bg-black/55
              border-white/10
            `
            : `
              bg-white/75
              border-black/5
              shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            `
          }
        `}
      >

        {/* GLOW */}
        <div
          className="
            absolute
            inset-0

            rounded-[2rem]

            bg-gradient-to-r
            from-pink-500/5
            via-fuchsia-500/5
            to-pink-500/5

            pointer-events-none
          "
        />

        {navItems.map((item) => {

          const active =
            location.pathname === item.path

          return (

            <Link
              key={item.path}
              to={item.path}
              className="
                relative

                flex
                flex-col
                items-center
                justify-center

                gap-1

                min-w-[70px]

                transition-all
                duration-300

                hover:scale-105
                active:scale-95
              "
            >

              {/* ACTIVE BACKGROUND */}
              <div
                className={`
                  absolute

                  w-14
                  h-14

                  rounded-2xl

                  transition-all
                  duration-300

                  ${active
                    ? `
                      bg-gradient-to-br
                      from-pink-500
                      to-fuchsia-600

                      shadow-[0_0_25px_rgba(255,79,163,0.45)]

                      scale-100
                      opacity-100
                    `
                    : `
                      scale-75
                      opacity-0
                    `
                  }
                `}
              />

              {/* ICON */}
              <div
                className={`
                  relative
                  z-10

                  transition-all
                  duration-300

                  ${active
                    ? `
                      text-white
                      -translate-y-[1px]
                    `
                    : darkMode
                      ? 'text-zinc-400'
                      : 'text-zinc-500'
                  }
                `}
              >
                {item.icon}
              </div>

              {/* LABEL */}
              <span
                className={`
                  relative
                  z-10

                  text-[11px]
                  font-semibold

                  transition-all
                  duration-300

                  ${active
                    ? 'text-white'
                    : darkMode
                      ? 'text-zinc-400'
                      : 'text-zinc-500'
                  }
                `}
              >
                {item.label}
              </span>

            </Link>

          )
        })}

      </div>

    </div>

  )
}

export default Navbar