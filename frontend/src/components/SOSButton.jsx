import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useSettings } from '../context/SettingsContext'
import { useIncidents } from '../context/IncidentContext'
import { useRoute } from '../context/RouteContext'
import { useDanger } from '../context/DangerContext'

function SOSButton() {

    const [active, setActive] = useState(false)
    const { contacts } = useSettings()
    const { addIncident } = useIncidents()
    const { selectedRoute } = useRoute()
    const { addDangerZone } = useDanger()

    const handleSOS = () => {

        setActive(true)

        addDangerZone(
            selectedRoute.position
        )

        addIncident({
            type: 'Botón SOS activado',
            location: 'Ubicación monitoreada',
            risk: 'Crítico',
            time: 'Justo ahora',
        })

        setTimeout(() => {
            setActive(false)
        }, 5000)
    }

    return (
        <>
            {/* ALERTA */}
            {active && (

                <div
                    className="
                    absolute
                    top-6
                    left-1/2
                    -translate-x-1/2
                    z-[99999]
                    w-[90%]
                    max-w-md
                    "
                >

                    <div
                        className="
                        bg-red-600/95
                        backdrop-blur-xl
                        rounded-3xl
                        p-6
                        shadow-2xl
                        border
                        border-red-400/30
                        animate-pulse
                    "
                    >

                        <h2 className="text-2xl font-bold">
                            🚨 Emergencia Detectada
                        </h2>

                        <p className="mt-2 text-red-100">
                            Compartiendo ubicación en tiempo real...
                        </p>

                        <div className="mt-5">

                            <p className="font-semibold text-red-100">
                                Enviando alerta a:
                            </p>

                            <div className="mt-3 space-y-2">

                                {contacts.map((contact, index) => (

                                    <div
                                        key={index}
                                        className="
                                            bg-white/10
                                            rounded-2xl
                                            px-4
                                            py-3
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <span>
                                            {contact.name}
                                        </span>

                                        <span className="text-sm text-red-100">
                                            {contact.phone}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>
            )}

            {/* BOTÓN */}
            <button
                onClick={handleSOS}
                className="
                absolute
                bottom-8
                right-8
                z-[9999]
                bg-red-600
                hover:bg-red-700
                text-white
                w-24
                h-24
                rounded-full
                shadow-2xl
                flex
                items-center
                justify-center
                transition-all
                duration-300
                hover:scale-[1.03]
                active:scale-95
                "
            >
                <div className="flex flex-col items-center">
                    <AlertTriangle size={32} />
                    <span className="font-bold text-lg">
                        SOS
                    </span>
                </div>
            </button>
        </>
    )
}

export default SOSButton