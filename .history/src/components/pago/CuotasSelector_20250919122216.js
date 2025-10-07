'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const CuotasSelector = ({ total, onCuotasChange, tipoTarjeta }) => {
  const [cuotasSeleccionadas, setCuotasSeleccionadas] = useState(1)

  // Configuración de cuotas por tipo de tarjeta
  const getCuotasDisponibles = (tipo) => {
    const cuotasBase = [
      { cuotas: 1, descripcion: 'Pago único', interes: 0 },
      { cuotas: 3, descripcion: '3 cuotas', interes: 0 },
      { cuotas: 6, descripcion: '6 cuotas', interes: 0 },
      { cuotas: 12, descripcion: '12 cuotas', interes: 0 }
    ]

    // Diferentes opciones según el tipo de tarjeta
    switch (tipo) {
      case 'visa':
        return [
          ...cuotasBase,
          { cuotas: 18, descripcion: '18 cuotas', interes: 0 },
          { cuotas: 24, descripcion: '24 cuotas', interes: 0 }
        ]
      case 'mastercard':
        return [
          ...cuotasBase,
          { cuotas: 18, descripcion: '18 cuotas', interes: 0 },
          { cuotas: 24, descripcion: '24 cuotas', interes: 0 }
        ]
      case 'amex':
        return [
          ...cuotasBase,
          { cuotas: 18, descripcion: '18 cuotas', interes: 0 }
        ]
      case 'discover':
        return [
          ...cuotasBase,
          { cuotas: 18, descripcion: '18 cuotas', interes: 0 }
        ]
      default:
        return cuotasBase
    }
  }

  const cuotasDisponibles = getCuotasDisponibles(tipoTarjeta)

  const calcularCuota = (cuotas) => {
    if (cuotas === 1) return total
    return Math.round((total / cuotas) * 100) / 100
  }

  const handleCuotasChange = (cuotas) => {
    setCuotasSeleccionadas(cuotas)
    onCuotasChange(cuotas)
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-gray-900">Seleccionar Cuotas</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {cuotasDisponibles.map((opcion) => (
          <motion.button
            key={opcion.cuotas}
            onClick={() => handleCuotasChange(opcion.cuotas)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              cuotasSeleccionadas === opcion.cuotas
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <div className="font-semibold text-sm">{opcion.descripcion}</div>
              <div className="text-lg font-bold">
                ${calcularCuota(opcion.cuotas).toFixed(2)}
              </div>
              {opcion.cuotas > 1 && (
                <div className="text-xs text-gray-500">
                  Total: ${total}.00
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Información adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium">Información sobre cuotas:</p>
            <ul className="mt-1 space-y-1 text-xs">
              <li>• Las cuotas se cargan automáticamente a tu tarjeta</li>
              <li>• No hay intereses adicionales</li>
              <li>• Puedes cancelar en cualquier momento</li>
              <li>• Disponible según tu banco emisor</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CuotasSelector
