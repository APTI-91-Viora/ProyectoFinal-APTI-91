import { useState, useEffect } from 'react'

import {
    Shield,
    Mail,
    Lock,
    User,
    ArrowRight,
} from 'lucide-react'

function Auth({ onLoginSuccess }) {

    const [isLogin, setIsLogin] = useState(true)

    const [users, setUsers] = useState([])

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [message, setMessage] = useState('')

    // LOAD USERS
    useEffect(() => {

        const storedUsers =
            JSON.parse(localStorage.getItem('safeUsers')) || []

        setUsers(storedUsers)

    }, [])

    // SAVE USERS
    useEffect(() => {

        localStorage.setItem(
            'safeUsers',
            JSON.stringify(users)
        )

        setTimeout(() => {
            onLogin()
        }, 1200)

    }, [users])

    // REGISTER
    const handleRegister = () => {

        if (
            !registerData.username ||
            !registerData.email ||
            !registerData.password ||
            !registerData.confirmPassword
        ) {
            setMessage('Completa todos los campos')
            return
        }

        if (
            registerData.password !==
            registerData.confirmPassword
        ) {
            setMessage('Las contraseñas no coinciden')
            return
        }

        const exists = users.find(
            (u) => u.email === registerData.email
        )

        if (exists) {
            setMessage('Ese usuario ya existe')
            return
        }

        const newUser = {
            username: registerData.username,
            email: registerData.email,
            password: registerData.password,
        }

        setUsers([...users, newUser])

        setMessage('Cuenta creada correctamente')

        setRegisterData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        })

        setTimeout(() => {
            setIsLogin(true)
            setMessage('')
        }, 1800)
    }

    // LOGIN
    const handleLogin = () => {

        const user = users.find(
            (u) =>
                u.email === loginData.email &&
                u.password === loginData.password
        )

        if (!user) {
            setMessage('Credenciales incorrectas')
            return
        }

        setMessage(`Bienvenida ${user.username}`)

        localStorage.setItem(
            'safeCurrentUser',
            JSON.stringify(user)
        )

        setTimeout(() => {

            onLoginSuccess()

        }, 1000)

    }

    return (

        <div
            className="
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden

        bg-gradient-to-br
        from-[#ff7eb3]
        via-[#c86bfa]
        to-[#6c63ff]

        p-6
      "
        >

            {/* BG GLOW */}
            <div
                className="
          absolute
          w-[500px]
          h-[500px]
          bg-pink-500/30
          blur-[120px]
          rounded-full
          top-[-100px]
          left-[-100px]
        "
            />

            <div
                className="
          absolute
          w-[400px]
          h-[400px]
          bg-violet-500/30
          blur-[120px]
          rounded-full
          bottom-[-120px]
          right-[-120px]
        "
            />

            {/* CONTAINER */}
            <div
                className="
          relative
          w-full
          max-w-6xl
          min-h-[700px]

          rounded-[40px]
          overflow-hidden

          border
          border-white/20

          bg-white/10
          backdrop-blur-2xl

          shadow-[0_20px_80px_rgba(0,0,0,0.35)]

          flex
        "
            >

                {/* LEFT */}
                <div
                    className={`
            absolute
            top-0
            h-full
            w-1/2

            transition-all
            duration-700
            ease-in-out

            ${isLogin
                            ? 'left-0'
                            : 'left-1/2'}
          `}
                >

                    <div
                        className="
              h-full
              flex
              flex-col
              items-center
              justify-center

              p-12

              bg-gradient-to-br
              from-pink-500/20
              via-white/10
              to-violet-500/20
            "
                    >

                        <div
                            className="
                w-32
                h-32
                rounded-[35px]

                bg-white/10
                backdrop-blur-xl

                border
                border-white/20

                flex
                items-center
                justify-center

                shadow-[0_0_40px_rgba(255,255,255,0.15)]
              "
                        >

                            <Shield
                                size={60}
                                className="text-white"
                            />

                        </div>

                        <h1
                            className="
                mt-8
                text-6xl
                font-black
                text-white
                tracking-tight
              "
                        >
                            SafeWoman
                        </h1>

                        <p
                            className="
                mt-4
                text-white/80
                text-center
                max-w-sm
                leading-relaxed
              "
                        >
                            Seguridad inteligente, rutas confiables
                            y monitoreo en tiempo real para
                            proteger lo que más importa.
                        </p>

                        <div
                            className="
                mt-10
                flex
                items-center
                gap-3

                px-5
                py-3

                rounded-2xl

                bg-white/10
                border
                border-white/10
              "
                        >

                            <div
                                className="
                  w-3
                  h-3
                  rounded-full
                  bg-green-400
                  animate-pulse
                "
                            />

                            <span className="text-white/90">
                                Sistema protegido
                            </span>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}
                <div
                    className={`
            absolute
            top-0
            h-full
            w-1/2

            transition-all
            duration-700
            ease-in-out

            flex
            items-center
            justify-center

            ${isLogin
                            ? 'left-1/2'
                            : 'left-0'}
          `}
                >

                    <div className="w-full max-w-md px-10">

                        <h2
                            className="
                text-5xl
                font-black
                text-white
                tracking-tight
              "
                        >
                            {isLogin
                                ? 'Iniciar Sesión'
                                : 'Crear Cuenta'}
                        </h2>

                        <p className="mt-3 text-white/70">
                            {isLogin
                                ? 'Accede a tu cuenta segura'
                                : 'Únete a SafeWoman'}
                        </p>

                        {/* MESSAGE */}
                        {message && (

                            <div
                                className="
                  mt-6
                  p-4
                  rounded-2xl

                  bg-white/10
                  border
                  border-white/10

                  text-white
                  text-sm
                "
                            >
                                {message}
                            </div>

                        )}

                        <div className="mt-8 space-y-5">

                            {!isLogin && (

                                <div className="relative">

                                    <User
                                        className="
                      absolute
                      left-5
                      top-1/2
                      -translate-y-1/2
                      text-white/60
                    "
                                    />

                                    <input
                                        type="text"
                                        placeholder="Usuario"
                                        value={registerData.username}
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                username: e.target.value,
                                            })
                                        }
                                        className="
                      w-full
                      pl-14
                      pr-5
                      py-5

                      rounded-2xl

                      bg-white/10
                      border
                      border-white/10

                      backdrop-blur-xl

                      text-white
                      placeholder:text-white/50

                      outline-none
                    "
                                    />

                                </div>

                            )}

                            {/* EMAIL */}
                            <div className="relative">

                                <Mail
                                    className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-white/60
                  "
                                />

                                <input
                                    type="email"
                                    placeholder="Correo"
                                    value={
                                        isLogin
                                            ? loginData.email
                                            : registerData.email
                                    }
                                    onChange={(e) =>

                                        isLogin

                                            ? setLoginData({
                                                ...loginData,
                                                email: e.target.value,
                                            })

                                            : setRegisterData({
                                                ...registerData,
                                                email: e.target.value,
                                            })
                                    }
                                    className="
                    w-full
                    pl-14
                    pr-5
                    py-5

                    rounded-2xl

                    bg-white/10
                    border
                    border-white/10

                    backdrop-blur-xl

                    text-white
                    placeholder:text-white/50

                    outline-none
                  "
                                />

                            </div>

                            {/* PASSWORD */}
                            <div className="relative">

                                <Lock
                                    className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-white/60
                  "
                                />

                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    value={
                                        isLogin
                                            ? loginData.password
                                            : registerData.password
                                    }
                                    onChange={(e) =>

                                        isLogin

                                            ? setLoginData({
                                                ...loginData,
                                                password: e.target.value,
                                            })

                                            : setRegisterData({
                                                ...registerData,
                                                password: e.target.value,
                                            })
                                    }
                                    className="
                    w-full
                    pl-14
                    pr-5
                    py-5

                    rounded-2xl

                    bg-white/10
                    border
                    border-white/10

                    backdrop-blur-xl

                    text-white
                    placeholder:text-white/50

                    outline-none
                  "
                                />

                            </div>

                            {/* CONFIRM */}
                            {!isLogin && (

                                <div className="relative">

                                    <Lock
                                        className="
                      absolute
                      left-5
                      top-1/2
                      -translate-y-1/2
                      text-white/60
                    "
                                    />

                                    <input
                                        type="password"
                                        placeholder="Confirmar contraseña"
                                        value={registerData.confirmPassword}
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        className="
                      w-full
                      pl-14
                      pr-5
                      py-5

                      rounded-2xl

                      bg-white/10
                      border
                      border-white/10

                      backdrop-blur-xl

                      text-white
                      placeholder:text-white/50

                      outline-none
                    "
                                    />

                                </div>

                            )}

                            {/* BUTTON */}
                            <button
                                onClick={
                                    isLogin
                                        ? handleLogin
                                        : handleRegister
                                }
                                className="
                  group
                  w-full

                  mt-4
                  py-5

                  rounded-2xl

                  bg-white
                  hover:bg-pink-100

                  transition-all
                  duration-300

                  text-zinc-900
                  font-bold

                  flex
                  items-center
                  justify-center
                  gap-3
                "
                            >

                                {isLogin
                                    ? 'Ingresar'
                                    : 'Crear Cuenta'}

                                <ArrowRight
                                    className="
                    group-hover:translate-x-1
                    transition-all
                  "
                                />

                            </button>

                        </div>

                        {/* SWITCH */}
                        <div className="mt-8 text-center">

                            <button
                                onClick={() => {

                                    setIsLogin(!isLogin)
                                    setMessage('')

                                }}
                                className="
                  text-white/80
                  hover:text-white

                  transition-all
                "
                            >

                                {isLogin
                                    ? '¿No tienes cuenta? Regístrate'
                                    : '¿Ya tienes cuenta? Inicia sesión'}

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Auth