import { useMap } from 'react-leaflet'
import { LocateFixed } from 'lucide-react'

function LocateButton({ position }) {

  const map = useMap()

  const goToLocation = () => {

    map.flyTo(
      position,
      16,
      {
        duration: 1.5,
      }
    )
  }

  return (
    <div
      className="
        absolute
        bottom-36
        right-6
        z-[9999]
      "
    >

      <button
        onClick={goToLocation}
        className="
          bg-black/70
          hover:bg-black
          text-white
          p-4
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

        <LocateFixed size={26} />

      </button>

    </div>
  )
}

export default LocateButton