'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Contador() {
  const [isInView, setIsInView] = useState(false)
  const [yearsDisplay, setYearsDisplay] = useState(0)
  const [restaurantsDisplay, setRestaurantsDisplay] = useState(0)

  const countYears = useMotionValue(0)
  const roundedYears = useTransform(countYears, (latest) => Math.round(latest))

  const countRestaurants = useMotionValue(0)
  const roundedRestaurants = useTransform(countRestaurants, (latest) => Math.round(latest))

  useEffect(() => {
    const unsubscribeYears = roundedYears.on('change', (latest) => setYearsDisplay(latest))
    const unsubscribeRestaurants = roundedRestaurants.on('change', (latest) => setRestaurantsDisplay(latest))
    return () => {
      unsubscribeYears()
      unsubscribeRestaurants()
    }
  }, [roundedYears, roundedRestaurants])

  useEffect(() => {
    if (isInView) {
      animate(countYears, 6, { duration: 2, ease: "easeOut" })
      animate(countRestaurants, 100, { duration: 2.5, ease: "easeOut" })
    }
  }, [isInView, countYears, countRestaurants])

  return (
    <section className="py-10 sm:py-14 bg-[#3A4040] relative overflow-hidden">
      {/* Fondo animado con ondas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Onda 1 - Principal */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scaleX: [1, 1.1, 1],
            scaleY: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <path
              d="M0,150 Q250,50 500,150 T1000,150 L1000,300 L0,300 Z"
              fill="#FF4B5C"
              opacity="0.2"
            />
          </svg>
        </motion.div>

        {/* Onda 2 - Secundaria */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scaleX: [1, 1.15, 1],
            scaleY: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <path
              d="M0,200 Q200,100 500,200 T1000,200 L1000,300 L0,300 Z"
              fill="#FF6B7A"
              opacity="0.15"
            />
          </svg>
        </motion.div>

        {/* Onda 3 - Terciaria */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scaleX: [1, 1.12, 1],
            scaleY: [1, 1.06, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <path
              d="M0,120 Q300,60 500,120 T1000,120 L1000,300 L0,300 Z"
              fill="#FF8A95"
              opacity="0.1"
            />
          </svg>
        </motion.div>

        {/* Onda 4 - Cuarta capa */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scaleX: [1, 1.08, 1],
            scaleY: [1, 1.04, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <path
              d="M0,180 Q150,80 500,180 T1000,180 L1000,300 L0,300 Z"
              fill="#FF4B5C"
              opacity="0.08"
            />
          </svg>
        </motion.div>

        {/* Barras de audio animadas - Mejoradas */}
        <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center space-x-0.5 px-4">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-[#FF4B5C] rounded-t"
              animate={{
                height: [
                  Math.random() * 15 + 3,
                  Math.random() * 35 + 15,
                  Math.random() * 10 + 3
                ],
                opacity: [0.2, 0.7, 0.2]
              }}
              transition={{
                duration: 1.5 + Math.random() * 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.05
              }}
            />
          ))}
        </div>

        {/* Partículas flotantes - Optimizadas */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-[#FF4B5C] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, Math.random() * 15 - 7.5, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Contenido principal */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsInView(true)}
        >
          {/* Bloque Izquierdo */}
          <div className="flex items-baseline justify-center lg:justify-start">
            <span className="text-6xl md:text-7xl font-bold text-[#FF4B5C]">
              {yearsDisplay}
            </span>
            <div className="ml-3 text-left">
              <div className="text-lg sm:text-xl font-bold text-[#FF4B5C]">AÑOS</div>
              <div className="text-lg sm:text-xl font-bold text-[#FF4B5C]">EN EL</div>
              <div className="text-lg sm:text-xl font-bold text-[#FF4B5C]">RUBRO</div>
            </div>
            <p className="ml-4 text-base sm:text-lg text-white font-medium max-w-xs">
              Conocemos los dolores <br /> causados x la vieja informática.
            </p>
          </div>

          {/* Bloque Derecho */}
          <div className="flex items-baseline justify-center lg:justify-start">
            <span className="text-6xl md:text-7xl font-bold text-[#FF4B5C]">
              +{restaurantsDisplay}
            </span>
            <p className="ml-4 text-base sm:text-lg text-white font-medium max-w-sm">
              Locales gastronómicos <br /> digitalizados exitosamente.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
