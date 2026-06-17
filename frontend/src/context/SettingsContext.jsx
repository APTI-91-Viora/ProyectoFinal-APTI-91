import {
  createContext,
  useContext,
  useState
} from 'react'

const SettingsContext = createContext()

export function SettingsProvider({ children }) {

  // TEMA
  const [darkMode, setDarkMode] =
    useState(true)

  // CONTACTOS
  const [contacts, setContacts] = useState([
    {
      name: 'Mamá',
      phone: '3111234567',
      priority: true,
    },
  ])

  // EMERGENCIA
  const [sosSound, setSosSound] =
    useState(true)

  const [shareLocation, setShareLocation] =
    useState(true)

  const [autoMonitoring, setAutoMonitoring] =
    useState(true)

  // FUNCIONES
  const addContact = (contact) => {

    setContacts((prev) => [
      ...prev,
      contact,
    ])
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    // opcional: reset estados
    setContacts([])
    setDarkMode(true)
  }

  return (

    <SettingsContext.Provider
      value={{

        // TEMA
        darkMode,
        setDarkMode,

        // CONTACTOS
        contacts,
        addContact,

        // EMERGENCIA
        sosSound,
        setSosSound,

        shareLocation,
        setShareLocation,

        autoMonitoring,
        setAutoMonitoring,

        logout,

      }}
    >

      {children}

    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}

