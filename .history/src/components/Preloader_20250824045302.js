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
    }, 3500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-[#061311] to-violet-950 flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-64 h-64">
            {/* Parte 1 - Izquierda */}
            <motion.div
              className="absolute inset-0"
              initial={{ x: -100, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1 
              }}
              transition={{ 
                duration: 6.5, 
                ease: "easeInOut",
                delay: 0.3
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
              initial={{ x: 162, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1 
              }}
              transition={{ 
                duration: 7, 
                ease: "easeInOut",
                delay: 0.3
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

          {/* Texto de carga */}
          <motion.div
            className="absolute bottom-20 text-white text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
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
