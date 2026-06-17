import { dangerZones } from '../data/dangerZones'

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const R = 6371

    const dLat =
        (lat2 - lat1) * Math.PI / 180

    const dLon =
        (lon2 - lon1) * Math.PI / 180

    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)

    const c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        )

    return R * c
}

export function calculateRisk(position) {

    const nearestDanger = dangerZones
        .map((zone) => {

            const distance =
                calculateDistance(
                    position[0],
                    position[1],
                    zone.position[0],
                    zone.position[1]
                )

            return {
                distance,
                level: zone.level,
            }

        })
        .sort((a, b) =>
            a.distance - b.distance
        )[0]

    const distanceMeters =
        Math.round(nearestDanger.distance * 1000)

    let safety = 95

    const levelPenalty =
        nearestDanger.level * 8

    if (distanceMeters < 300) {
        safety = 45 - levelPenalty
    }

    else if (distanceMeters < 600) {
        safety = 60 - levelPenalty
    }

    else if (distanceMeters < 900) {
        safety = 75 - levelPenalty
    }

    else if (distanceMeters < 1300) {
        safety = 85 - levelPenalty
    }

    else {
        safety = 95 - levelPenalty
    }

    safety = Math.max(10, safety)
    
    let risk = 'BAJO'

    if (safety <= 55) {
        risk = 'ALTO'
    }

    else if (safety <= 75) {
        risk = 'MEDIO'
    }

    return {
        safety,
        risk,
        distanceMeters,
    }
}