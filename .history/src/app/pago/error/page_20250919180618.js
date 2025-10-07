'use client'

import { motion } from 'framer-motion'

export default function PagoError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Icono de error */}
        <motion.div
          className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 300 }}
        >
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </motion.div>

        {/* Título */}
        <motion.h1
          className="text-2xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Error en el Pago
        </motion.h1>

        {/* Mensaje */}
        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Hubo un problema al procesar tu pago. Por favor intenta nuevamente o contacta con soporte.
        </motion.p>

        {/* Botones */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => window.history.back()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium"
          >
            Intentar Nuevamente
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-lg transition-colors duration-200 font-medium"
          >
            Volver al Inicio
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
