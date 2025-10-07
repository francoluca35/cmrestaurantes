'use client'

import { motion } from 'framer-motion'

const ResumenCuotas = ({ total, cuotas, tipoTarjeta, moneda = 'usd' }) => {
  const cuotaMensual = total / cuotas
  const fechaActual = new Date()
  
  // Generar fechas de vencimiento
  const generarFechasVencimiento = () => {
    const fechas = []
    for (let i = 0; i < cuotas; i++) {
      const fecha = new Date(fechaActual)
      fecha.setMonth(fecha.getMonth() + i)
      fechas.push(fecha)
    }
    return fechas
  }

  const fechasVencimiento = generarFechasVencimiento()

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Resumen de Cuotas</h3>
        <div className="text-sm text-gray-500">
          {tipoTarjeta.toUpperCase()}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total a pagar:</span>
          <span className="font-semibold">${total.toLocaleString()} {moneda.toUpperCase()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Cuotas:</span>
          <span className="font-semibold">{cuotas}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Valor por cuota:</span>
          <span className="font-semibold text-green-600">${cuotaMensual.toLocaleString()} {moneda.toUpperCase()}</span>
        </div>
      </div>

      {cuotas > 1 && (
        <div className="border-t border-gray-200 pt-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Fechas de vencimiento:</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {fechasVencimiento.map((fecha, index) => (
              <div key={index} className="flex justify-between text-xs text-gray-600">
                <span>Cuota {index + 1}:</span>
                <span>{fecha.toLocaleDateString('es-ES', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded p-3">
        <div className="flex items-start space-x-2">
          <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
          </svg>
          <div className="text-xs text-blue-800">
            <p className="font-medium">Importante:</p>
            <p>Las cuotas se cargarán automáticamente a tu tarjeta en las fechas indicadas.</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ResumenCuotas
