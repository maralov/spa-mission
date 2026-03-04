import { useLocation, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

const CERT_URL = `${import.meta.env.BASE_URL}certificate.png`

export default function Certificate() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  const { slug } = useParams()

  const name = location.state?.name ?? (slug === 'ksenia' ? 'Ксюша' : 'Юля')
  const pairName = slug === 'ksenia' ? 'Юля' : 'Ксюша'

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading || !name) return

    const defaults = { origin: { y: 0.7 } }
    confetti({ ...defaults, particleCount: 120, spread: 70, startVelocity: 45 })
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 80,
        spread: 110,
        startVelocity: 35
      })
    }, 250)
  }, [loading, name])

  const downloadCertificate = () => {
    const url = `${import.meta.env.BASE_URL}certificate.png`
    window.open(url, '_blank')
  }

  if (!name) {
    return (
      <div className="text-center">
        <p>Сесія втрачена</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="relative w-full max-w-md">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="h-12 w-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              </div>

              <p className="text-purple-100 font-semibold">
                Формуємо твій весняний подарунок…
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center text-xl font-extrabold text-white drop-shadow-[0_10px_25px_rgba(168,85,247,0.55)]"
              >
                🎉 Вітаємо з святом весни!
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <p className="text-center text-gray-100 font-medium">
                  В подарунок ти отримуєш сертифікат на SPA-відпочинок 💐
                </p>

                <div className="mt-5 space-y-2 text-m text-gray-300">
                  <p>
                    <span className="font-semibold">Де:</span> Sobi club
                  </p>
                  <p>
                    <span className="font-semibold">Коли:</span> 19.03.2026
                  </p>
                  <p>
                    <span className="font-semibold">З ким:</span> тільки ти і{' '}
                    {pairName}
                  </p>
                </div>

                {/* Preview (красиво показати саме сертифікат) */}
                <button
                  onClick={downloadCertificate}
                  className="p-0 bg-transparent mt-5 overflow-hidden rounded-2xl border border-white/60 shadow"
                >
                  <img
                    src={CERT_URL}
                    alt="SPA Certificate"
                    className="w-full h-auto"
                  />
                </button>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={downloadCertificate}
                className="w-full py-3 rounded-xl text-white font-semibold shadow-lg
                           bg-gradient-to-r from-purple-500 to-pink-500
                           hover:from-purple-600 hover:to-pink-600 transition"
              >
                📥 Отримати сертифікат
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tailwind keyframes прямо тут, щоб не лізти в конфіг */}
      <style>{`
        @keyframes sparklePulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.03); }
        }
        @keyframes sparkleMove {
          0% { transform: translate3d(0,0,0); opacity: 0.5; }
          50% { transform: translate3d(-12px, 10px, 0); opacity: 0.75; }
          100% { transform: translate3d(0,0,0); opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
