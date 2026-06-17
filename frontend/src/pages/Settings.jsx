import { useState } from 'react'

import {
  Moon,
  Sun,
  Phone,
  User,
  ShieldCheck,
  MapPinned,
  Siren,
  Satellite,
  Info,
  BellRing,
  ChevronRight,
} from 'lucide-react'

import {
  useSettings
} from '../context/SettingsContext'

import PageTransition from '../components/PageTransition'

function Settings() {

  const {
    darkMode,
    setDarkMode,

    contacts,
    addContact,

    sosSound,
    setSosSound,

    shareLocation,
    setShareLocation,

    autoMonitoring,
    setAutoMonitoring,

    logut,
  } = useSettings()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

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

  const inputBg = darkMode
    ? `
      bg-white/5
      border-white/10
      text-white
      placeholder:text-zinc-500
    `
    : `
      bg-white/60
      border-white/50
      text-zinc-900
      placeholder:text-zinc-500
    `

  const secondaryText = darkMode
    ? 'text-zinc-400'
    : 'text-zinc-600'

  const handleAddContact = () => {

    if (!name || !phone) return

    addContact({
      name,
      phone,
    })

    setName('')
    setPhone('')
  }

  const Toggle = ({ active }) => (
    <div
      className={`
        w-14
        h-8
        rounded-full
        transition-all
        duration-300
        flex
        items-center
        px-1

        ${active
          ? 'bg-pink-500 justify-end'
          : 'bg-zinc-600 justify-start'}
      `}
    >
      <div
        className="
          w-6
          h-6
          bg-white
          rounded-full
          shadow-md
        "
      />
    </div>
  )

  return (
    <PageTransition>

      <div
        className={`
          min-h-screen
          ${pageBg}
          p-6
          pb-32
        `}
      >

        {/* HEADER */}
        <div className="w-full flex items-start justify-between">

          <p className={`text-sm uppercase tracking-[0.25em] mb-2 
            ${darkMode ? 'text-pink-400' : 'text-pink-500'
            }`}>
            Preferencias Inteligentes
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
            Configuración
          </h1>

          <p className={`mt-3 ${secondaryText}`}>
            Personaliza SafeWoman y controla tu seguridad
          </p>

          {/* BOTÓN LOGOUT */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                const confirm = window.confirm('¿Seguro que deseas cerrar sesión?')
                if (confirm) logout()
              }}
              className="
              px-5
              py-3

              rounded-2xl

              bg-red-500/90
              hover:bg-red-600

              text-white
              font-semibold

              shadow-[0_0_25px_rgba(239,68,68,0.25)]

              transition-all
              duration-300

              hover:scale-[1.05]
              active:scale-95

              whitespace-nowrap
            "
            >
              🚪 Salir
            </button>
          </div>

        </div>

        {/* APARIENCIA */}
        <div
          className={`
            group
            relative
            overflow-hidden

            mt-8
            ${cardBg}

            rounded-[30px]
            p-6

            transition-all
            duration-500

            hover:-translate-y-1
            hover:border-pink-400/20
            hover:shadow-[0_10px_40px_rgba(236,72,153,0.12)]
          `}
        >

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

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div
                  className="
                    p-3
                    rounded-2xl
                    bg-pink-500/15
                    shadow-[0_0_25px_rgba(236,72,153,0.18)]
                  "
                >
                  {darkMode
                    ? <Moon className="text-pink-400" />
                    : <Sun className="text-yellow-400" />
                  }
                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    Apariencia
                  </h2>

                  <p className={secondaryText}>
                    Cambia el estilo visual de la app
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setDarkMode(!darkMode)
                }
              >
                <Toggle active={darkMode} />
              </button>

            </div>

          </div>

        </div>

        {/* EMERGENCIA */}
        <div
          className={`
            mt-6
            ${cardBg}
            rounded-[30px]
            p-6
          `}
        >

          <div className="flex items-center gap-4">

            <div
              className="
                p-3
                rounded-2xl
                bg-red-500/15
                shadow-[0_0_25px_rgba(239,68,68,0.2)]
              "
            >
              <Siren className="text-red-400" />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Emergencia
              </h2>

              <p className={secondaryText}>
                Opciones de seguridad inteligente
              </p>

            </div>

          </div>

          <div className="mt-8 space-y-6">

            {/* SONIDO */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <BellRing className="text-pink-400" />

                <div>

                  <p className="font-semibold">
                    Sonido SOS
                  </p>

                  <p className={secondaryText}>
                    Activar alarma sonora
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setSosSound(!sosSound)
                }
              >
                <Toggle active={sosSound} />
              </button>

            </div>

            {/* UBICACION */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <MapPinned className="text-blue-400" />

                <div>

                  <p className="font-semibold">
                    Compartir ubicación
                  </p>

                  <p className={secondaryText}>
                    Enviar GPS automáticamente
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setShareLocation(!shareLocation)
                }
              >
                <Toggle active={shareLocation} />
              </button>

            </div>

            {/* IA */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <ShieldCheck className="text-emerald-400" />

                <div>

                  <p className="font-semibold">
                    Monitoreo automático
                  </p>

                  <p className={secondaryText}>
                    Detección inteligente activa
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setAutoMonitoring(!autoMonitoring)
                }
              >
                <Toggle active={autoMonitoring} />
              </button>

            </div>

          </div>

        </div>

        {/* CONTACTOS */}
        <div
          className={`
            mt-6
            ${cardBg}
            rounded-[30px]
            p-6
          `}
        >

          <div className="flex items-center gap-4">

            <div
              className="
                p-3
                rounded-2xl
                bg-emerald-500/15
                shadow-[0_0_25px_rgba(16,185,129,0.2)]
              "
            >
              <Phone className="text-emerald-400" />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Contactos
              </h2>

              <p className={secondaryText}>
                Personas de emergencia
              </p>

            </div>

          </div>

          <div className="mt-8 space-y-5">

            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className={`
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                transition-all

                ${inputBg}
              `}
            />

            <input
              type="text"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className={`
                w-full
                border
                rounded-2xl
                p-4
                outline-none
                transition-all

                ${inputBg}
              `}
            />

            <button
              onClick={handleAddContact}
              className="
                w-full
                bg-pink-500
                hover:bg-pink-600

                py-4
                rounded-2xl

                font-semibold
                text-white

                transition-all
                duration-300

                hover:scale-[1.01]
                active:scale-[0.98]
              "
            >
              Agregar contacto
            </button>

          </div>

          <div className="mt-6 space-y-4">

            {contacts.map((contact, index) => (

              <div
                key={index}
                className={`
                  ${inputBg}

                  border
                  p-4
                  rounded-2xl

                  flex
                  items-center
                  justify-between
                `}
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      p-3
                      rounded-xl
                      bg-pink-500/10
                    "
                  >
                    <User className="text-pink-400" />
                  </div>

                  <div>

                    <p className="font-semibold">
                      {contact.name}
                    </p>

                    <p className={secondaryText}>
                      {contact.phone}
                    </p>

                  </div>

                </div>

                <ChevronRight
                  className="text-zinc-500"
                  size={18}
                />

              </div>

            ))}

          </div>

        </div>

        {/* SISTEMA */}
        <div
          className={`
            mt-6
            ${cardBg}
            rounded-[30px]
            p-6
          `}
        >

          <div className="flex items-center gap-4">

            <div
              className="
                p-3
                rounded-2xl
                bg-cyan-500/15
                shadow-[0_0_25px_rgba(6,182,212,0.2)]
              "
            >
              <Satellite className="text-cyan-400" />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Estado del Sistema
              </h2>

              <p className={secondaryText}>
                Servicios inteligentes activos
              </p>

            </div>

          </div>

          <div className="mt-8 space-y-6">

            {[
              'GPS Activo',
              'Monitoreo Online',
              'IA Activa',
            ].map((item) => (

              <div
                key={item}
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <p className="font-medium">
                  {item}
                </p>

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-3
                      h-3
                      bg-green-400
                      rounded-full
                      animate-pulse
                    "
                  />

                  <span className="text-green-400 font-semibold">
                    Activo
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* INFO */}
        <div
          className={`
            mt-6
            ${cardBg}
            rounded-[30px]
            p-6
          `}
        >

          <div className="flex items-center gap-4">

            <div
              className="
                p-3
                rounded-2xl
                bg-white/10
              "
            >
              <Info className="text-zinc-300" />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Información
              </h2>

              <p className={secondaryText}>
                Detalles del sistema
              </p>

            </div>

          </div>

          <div className="mt-8 space-y-4">

            <div className="flex justify-between">

              <span className={secondaryText}>
                Versión
              </span>

              <span className="font-semibold">
                SafeWoman v1.0
              </span>

            </div>

            <div className="flex justify-between">

              <span className={secondaryText}>
                Proyecto
              </span>

              <span className="font-semibold">
                Expociencia
              </span>

            </div>

            <div className="flex justify-between">

              <span className={secondaryText}>
                Sistema
              </span>

              <span className="font-semibold">
                Seguridad Inteligente
              </span>

            </div>

          </div>

        </div>

      </div>

    </PageTransition>
  )
}

export default Settings