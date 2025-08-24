'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Preloader({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showComplete, setShowComplete] = useState(false)

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setShowComplete(true)
      
      // Mostrar logo completo por un momento
      const completeTimer = setTimeout(() => {
        setIsLoading(false)
        onComplete()
      }, 1500)
      
      return () => clearTimeout(completeTimer)
    }, 2500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-neutral-900 flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-64 h-64">
            {/* Parte 1 - Izquierda */}
            <motion.div
              className="absolute inset-0"
              initial={{ x: -150, opacity: 0 }}
              animate={{ 
                x: showComplete ? 0 : -75, 
                opacity: 1 
              }}
              transition={{ 
                duration: 2.5, 
                ease: "easeOut",
                delay: 0.2
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
              initial={{ x: 150, opacity: 0 }}
              animate={{ 
                x: showComplete ? 0 : 75, 
                opacity: 1 
              }}
              transition={{ 
                duration: 2.5, 
                ease: "easeOut",
                delay: 0.2
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

            {/* Logo completo que aparece al final */}
            <AnimatePresence>
              {showComplete && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Image
                    src="/Assets/logo-blanco.png"
                    alt="Quick Solution Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Texto de carga */}
          <motion.div
            className="absolute bottom-20 text-white text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {!showComplete ? (
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Cargando...
              </motion.span>
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                ¡Bienvenido!
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
