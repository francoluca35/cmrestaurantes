'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Preloader({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false)
      onComplete()
    }, 4000) // Ajustado para dar tiempo a la animación

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-[#040d0b] to-[#02272d] flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Container responsivo para el logo */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
            {/* Parte 1 - Izquierda */}
            <motion.div
              className="absolute inset-0"
              initial={{ x: -120, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1 
              }}
              transition={{ 
                duration: 3.5, 
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Image
                src="/Assets/part1.png"
                alt="Logo Part 1"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Parte 2 - Derecha */}
            <motion.div
              className="absolute inset-0"
              initial={{ x: 120, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1 
              }}
              transition={{ 
                duration: 3.5, 
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Image
                src="/Assets/part2.png"
                alt="Logo Part 2"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Texto de carga responsivo */}
          <motion.div
            className="absolute bottom-16 md:bottom-20 text-white text-base md:text-lg font-medium text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Bienvenidos...
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
