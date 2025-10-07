'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

export default function PagoExito() {
  const searchParams = useSearchParams()
  const [datosPago, setDatosPago] = useState(null)

  useEffect(() => {
    // Obtener datos del pago desde localStorage
    const datos = localStorage.getItem('datosRestaurante')
    if (datos) {
      setDatosPago(JSON.parse(datos))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Icono de éxito */}
        <motion.div
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 300 }}
        >
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </motion.div>

        {/* Título */}
        <motion.h1
          className="text-2xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ¡Pago Exitoso!
        </motion.h1>

        {/* Mensaje */}
        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Tu pago ha sido procesado correctamente. Recibirás un email de confirmación en breve.
        </motion.p>

        {/* Detalles del pago */}
        {datosPago && (
          <motion.div
            className="bg-gray-50 rounded-lg p-4 mb-6 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-semibold text-gray-900 mb-2">Detalles del Pedido:</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Restaurante:</span>
                <span className="font-medium">{datosPago.nombreRestaurante}</span>
              </div>
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-medium">{datosPago.plan}</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-medium">${datosPago.totalFinal?.toLocaleString()} {datosPago.moneda?.toUpperCase()}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Botones */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium"
          >
            Volver al Inicio
          </button>
          <button
            onClick={() => window.location.href = '/registro'}
            className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg transition-colors duration-200 font-medium"
          >
            Hacer Otro Pedido
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
