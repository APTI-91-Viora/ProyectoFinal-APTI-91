import { Shield, Radar, Activity } from 'lucide-react'

import {
    useRoute
} from '../context/RouteContext'

import {
    calculateRisk
} from '../utils/riskCalculator'

import {
    useDanger
} from '../context/DangerContext'

function LiveStats() {

    const { selectedRoute } = useRoute()
    const { dangerZones } = useDanger()

    const {
        safety,
        risk,
        distanceMeters,
    } = calculateRisk(
        selectedRoute.position
    )

    const nearbyZones = dangerZones.filter(
        (zone) => zone.level >= 3
    )

    return (

        <div
            className="
        absolute
        bottom-36
        left-5
        z-[9999]
        space-y-3
      "
        >

            {/* SCORE */}
            <div
                className="
          bg-black/70
          backdrop-blur-xl
          border
          border-white/10
          rounded-2xl
          p-4
          text-white
          w-64
        "
            >

                <div className="flex items-center gap-3">

                    <Shield
                        className={
                            risk === 'BAJO'
                                ? 'text-green-400'
                                : risk === 'MEDIO'
                                    ? 'text-yellow-400'
                                    : 'text-red-400'
                        }
                    />

                    <div>

                        <p className="text-sm text-zinc-400">
                            Nivel actual
                        </p>

                        <h2
                            className={`
                                text-1xl
                                font-black

                                ${risk === 'BAJO'
                                    ? 'text-green-400'
                                    : risk === 'MEDIO'
                                        ? 'text-yellow-400'
                                        : 'text-red-400'}
                            `}
                        >
                            RIESGO {risk}
                        </h2>

                    </div>

                </div>

            </div>

            {/* RADAR */}
            <div
                className="
                bg-black/70
                backdrop-blur-xl
                border
                border-white/10
                rounded-2xl
                p-4
                text-white
                "
            >

                <div className="flex items-center gap-3">

                    <Radar
                        className={
                            nearbyZones.length >= 5
                            ? 'text-red-400'
                            : nearbyZones.length >= 3
                                ? 'text-yellow-400'
                                : 'text-green-400'
                        }
                    />

                    <div>

                        <p className="font-semibold">
                        Radar activo
                        </p>

                        <p className="text-sm text-zinc-400">
                        {nearbyZones.length} zonas peligrosas detectadas
                        </p>

                    </div>

                </div>

            </div>

            {/* ACTIVIDAD */}
            <div
                className="
                    bg-black/70
                    backdrop-blur-xl
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                    text-white
                "
            >

                <div className="flex items-center gap-3">

                    <Activity className="text-yellow-400" />

                    <div>

                        <p className="font-semibold">
                            Actividad reciente
                        </p>

                        <p className="text-sm text-zinc-400">
                            3 alertas cercanas
                        </p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default LiveStats