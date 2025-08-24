'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Contador() {
  const [isInView, setIsInView] = useState(false)
  const [yearsDisplay, setYearsDisplay] = useState(0)
  const [restaurantsDisplay, setRestaurantsDisplay] = useState(0)
  
  // Contador para años
  const countYears = useMotionValue(0)
  const roundedYears = useTransform(countYears, (latest) => Math.round(latest))
  
  // Contador para restaurantes
  const countRestaurants = useMotionValue(0)
  const roundedRestaurants = useTransform(countRestaurants, (latest) => Math.round(latest))

  // Escuchar cambios en los valores de motion
  useEffect(() => {
    const unsubscribeYears = roundedYears.on('change', (latest) => {
      setYearsDisplay(latest)
    })
    
    const unsubscribeRestaurants = roundedRestaurants.on('change', (latest) => {
      setRestaurantsDisplay(latest)
    })

    return () => {
      unsubscribeYears()
      unsubscribeRestaurants()
    }
  }, [roundedYears, roundedRestaurants])

  useEffect(() => {
    if (isInView) {
      // Animar años de 0 a 6
      const yearsAnimation = animate(countYears, 6, {
        duration: 2,
        ease: "easeOut"
      })

      // Animar restaurantes de 0 a 100
      const restaurantsAnimation = animate(countRestaurants, 100, {
        duration: 2.5,
        ease: "easeOut"
      })

      return () => {
        yearsAnimation.stop()
        restaurantsAnimation.stop()
      }
    }
  }, [isInView, countYears, countRestaurants])

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsInView(true)}
        >
          {/* Sección Izquierda - Años */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-baseline justify-center lg:justify-start mb-6">
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-coral-400">
                {yearsDisplay}
              </span>
              <div className="ml-4 text-left">
                <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-coral-400">
                  AÑOS
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-coral-400">
                  EN EL
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-coral-400">
                  RUBRO
                </div>
              </div>
            </div>
            <p className="text-xl sm:text-2xl text-white font-medium">
              Conocemos los dolores causados x la vieja informática.
            </p>
          </motion.div>

          {/* Sección Derecha - Restaurantes */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-baseline justify-center lg:justify-start mb-6">
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-coral-400">
                +{restaurantsDisplay}
              </span>
            </div>
            <div className="text-left">
              <div className="text-xl sm:text-2xl text-white font-medium mb-2">
                Locales gastronómicos
              </div>
              <div className="text-xl sm:text-2xl text-white font-medium">
                digitalizados exitosamente.
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Patrón decorativo inferior */}
        <motion.div 
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-end space-x-1 sm:space-x-2">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center space-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.8 + (i * 0.05),
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                {/* Líneas verticales */}
                <div className="flex space-x-1">
                  {[...Array(Math.floor(Math.random() * 3) + 1)].map((_, j) => (
                    <div
                      key={j}
                      className="w-1 bg-gray-400 rounded-full"
                      style={{ 
                        height: `${Math.random() * 40 + 20}px`,
                        opacity: 0.6 + Math.random() * 0.4
                      }}
                    />
                  ))}
                </div>
                {/* Círculos */}
                {Math.random() > 0.5 && (
                  <div 
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    style={{ opacity: 0.4 + Math.random() * 0.6 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
