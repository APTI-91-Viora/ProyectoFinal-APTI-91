import { useState } from 'react'
import { useRoute } from '../context/RouteContext'
import { dangerZones } from '../data/dangerZones'

import {
    Shield,
    TriangleAlert,
    MapPin
} from 'lucide-react'

import {
    calculateRisk
} from '../utils/riskCalculator'

function Dashboard() {
    const { selectedRoute } = useRoute()
    const [expanded, setExpanded] =
        useState(false)

    const {
        safety,
        risk,
        distanceMeters,
    } = calculateRisk(
        selectedRoute.position
    )

    if (!expanded) {

        return (

            <div
                className="
                    absolute
                    top-6
                    left-5
                    z-[9999]
                "
            >

                <button
                    onClick={() =>
                        setExpanded(true)
                    }
                    className="
                        bg-black/70
                        backdrop-blur-xl
                        border
                        border-white/10
                        rounded-2xl
                        px-5
                        py-4
                        text-white
                        shadow-2xl
                        hover:scale-105
                        transition-all
                        duration-300
                        hover:scale-[1.03]
                        active:scale-95
                    "
                >

                    <div className="flex items-center gap-3">

                        <Shield className="text-green-400" />

                        <div className="text-left">

                            <p className="font-bold">
                                {safety}% Seguro
                            </p>

                            <p className="text-xs text-zinc-300">
                                Ver detalles
                            </p>

                        </div>

                    </div>

                </button>

            </div>
        )
    }




    return (
        <div
            className="
            absolute
            top-6
            left-1/2
            -translate-x-1/2
            z-[9999]
            w-[90%]
            max-w-md
        "
        >

            <div
                className="
                relative
                bg-gradient-to-br
                from-black/70
                via-zinc-900/70
                to-black/60
                backdrop-blur-2xl
                border
                border-white/10
                rounded-3xl
                p-6
                shadow-[0_8px_32px_rgba(0,0,0,0.45)]
                text-white
                "
            >

                {/* HEADER */}
                <div className="flex items-start justify-between gap-4 pr-12">

                    <div >
                        <h1
                            className="
                                text-4xl
                                font-black
                                tracking-tight
                                bg-gradient-to-r
                                from-pink-400
                                via-white
                                to-pink-300
                                bg-clip-text
                                text-transparent
                            "
                        >
                            SafeWoman
                        </h1>

                        <p
                            className="
                                text-sm
                                text-zinc-400
                                mt-1
                                tracking-wide
                                uppercase
                            "
                        >
                            Seguridad Inteligente
                        </p>
                    </div>

                    <div
                        className="
                            relative
                            overflow-hidden
                            mr-4
                            px-5
                            py-3
                            rounded-2xl
                            border
                            border-emerald-400/20
                            bg-emerald-500/10
                            backdrop-blur-xl
                            shadow-[0_0_25px_rgba(16,185,129,0.18)]
                        "
                        >

                        <div
                            className="
                            absolute
                            inset-0
                            bg-gradient-to-r
                            from-emerald-500/10
                            to-transparent
                            "
                        />

                        <div className="relative">

                            <p className="text-xs text-emerald-300 uppercase tracking-wider">
                            Seguridad
                            </p>

                            <h2 className="text-2xl font-black text-white">
                            {safety}%
                            </h2>

                        </div>

                    </div>

                   <button
                        onClick={() => setExpanded(false)}
                        className="
                            absolute
                            top-4
                            right-4
                            w-10
                            h-10
                            rounded-2xl

                            bg-black/30
                            hover:bg-white/10

                            border
                            border-white/10

                            text-zinc-400
                            hover:text-white

                            backdrop-blur-xl

                            transition-all
                            duration-300

                            flex
                            items-center
                            justify-center

                            hover:scale-105
                            active:scale-95
                        "
                    >
                        ✕
                    </button>
                </div>

                {/* CARDS */}
                <div className="mt-6 space-y-6">

                    {/* CARD 1 */}
                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            p-4
                            rounded-2xl

                            bg-white/[0.07]
                            border
                            border-white/[0.08]

                            shadow-[0_0_30px_rgba(255,255,255,0.03)]

                            hover:bg-white/[0.09]
                            hover:scale-[1.01]

                            transition-all
                            duration-300
                        "
                    >
                        <div
                            className="
                                bg-green-500/15
                                p-3
                                rounded-2xl
                                shadow-[0_0_25px_rgba(34,197,94,0.2)]
                            "
                        >
                            <Shield className="text-green-400" size={28} />
                        </div>

                        <div className="flex-1">
                            <p className="font-bold text-lg text-white">
                                Nivel de Seguridad
                            </p>

                            <p className="text-sm text-zinc-300">
                                Ruta hacia {selectedRoute.name}
                            </p>
                        </div>
                    </div>

                    {/* CARD 2 */}
                        <div
                            className="
                                flex
                                items-center
                                gap-4
                                p-4
                                rounded-2xl

                                bg-white/[0.07]
                                border
                                border-white/[0.08]

                                shadow-[0_0_30px_rgba(255,255,255,0.03)]

                                hover:bg-white/[0.09]
                                hover:scale-[1.01]

                                transition-all
                                duration-300
                            "
                        >
                        <div
                            className="
                                bg-yellow-500/15
                                p-3
                                rounded-2xl
                                shadow-[0_0_25px_rgba(250,204,21,0.2)]
                            "
                        >
                            <TriangleAlert className="text-yellow-400" size={28} />
                        </div>

                        <div className="flex-1">
                            <p className="font-bold text-lg text-white">
                                Alerta reciente
                            </p>

                            <p className="text-sm text-zinc-300">
                                Zona de riesgo detectada a {distanceMeters}m
                            </p>
                            <p className={`text-sm mt-1 font-semibold
                                ${risk === 'ALTO'
                                    ? 'text-red-400'
                                    : risk === 'MEDIO'
                                        ? 'text-yellow-400'
                                        : 'text-green-400'}
                            `}
                            >
                                Riesgo {risk}
                            </p>
                        </div>
                    </div>

                    {/* CARD 3 */}
                        <div
                            className="
                                flex
                                items-center
                                gap-4
                                p-4
                                rounded-2xl

                                bg-white/[0.07]
                                border
                                border-white/[0.08]

                                shadow-[0_0_30px_rgba(255,255,255,0.03)]

                                hover:bg-white/[0.09]
                                hover:scale-[1.01]

                                transition-all
                                duration-300
                            "
                        >
                        <div
                        className="
                            bg-blue-500/15
                            p-3
                            rounded-2xl
                            shadow-[0_0_25px_rgba(59,130,246,0.2)]
                        "
                        >
                            <MapPin className="text-blue-400" size={28} />
                        </div>

                        <div className="flex-1">
                            <p className="font-bold text-lg text-white">
                                Estado actual
                            </p>

                            <p className="text-sm text-zinc-300">
                                Ubicación monitoreada en tiempo real
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

                            <span className="text-xs text-green-300">
                                Sistema activo
                            </span>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Dashboard