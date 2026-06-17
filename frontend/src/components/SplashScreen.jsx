import { Shield } from 'lucide-react'

function SplashScreen() {

  return (

    <div
      className="
        fixed
        inset-0
        z-[999999]
        overflow-hidden

        bg-gradient-to-br
        from-zinc-950
        via-black
        to-zinc-900

        flex
        items-center
        justify-center
      "
    >

      {/* GLOW 1 */}
      <div
        className="
          absolute
          w-[450px]
          h-[450px]
          bg-pink-500/20
          rounded-full
          blur-3xl
          animate-pulse
        "
      />

      {/* GLOW 2 */}
      <div
        className="
          absolute
          bottom-0
          right-0
          w-[300px]
          h-[300px]
          bg-fuchsia-500/10
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          relative
          text-center
          fade-in
        "
      >

        {/* LOGO */}
        <div
          className="
            relative
            flex
            justify-center
            mb-8
          "
        >

          <div
            className="
              absolute
              w-32
              h-32
              bg-pink-500/20
              rounded-full
              blur-2xl
            "
          />

          <div
            className="
              w-28
              h-28
              rounded-[2rem]

              bg-white/5
              border
              border-white/10

              backdrop-blur-xl

              flex
              items-center
              justify-center

              shadow-2xl
            "
          >

            <Shield
              size={64}
              className="
                text-pink-500
                drop-shadow-[0_0_12px_rgba(255,79,163,0.55)]
              "
            />

          </div>

        </div>

        {/* TITLE */}
        <h1
          className="
            text-6xl
            font-black
            tracking-tight
            text-white
          "
        >
          SafeWoman
        </h1>

        {/* SUBTITLE */}
        <p
          className="
            mt-4
            text-zinc-400
            text-lg
            font-medium
            tracking-wide
          "
        >
          Seguridad inteligente en tiempo real
        </p>

      </div>

    </div>
  )
}

export default SplashScreen