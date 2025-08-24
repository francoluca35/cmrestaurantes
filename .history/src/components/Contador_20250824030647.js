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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        {/* Patrón decorativo inferior */}
        <div className="absolute bottom-0 left-0 w-full opacity-20">
          <img src="/decorativo-lineas.png" alt="decorativo" className="w-full h-12 object-cover" />
        </div>
      </div>
    </section>
  )
}
