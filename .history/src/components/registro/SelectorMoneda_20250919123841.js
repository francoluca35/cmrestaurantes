'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import useDolar from '@/hooks/useDolar'

const SelectorMoneda = ({ total, onMonedaChange, onTotalChange }) => {
  const [moneda, setMoneda] = useState('usd')
  const { valorDolar, loading, error, ultimaActualizacion, convertirAPesos } = useDolar()

  const calcularTotal = useCallback(() => {
    if (moneda === 'usd') {
      return total
    } else if (moneda === 'ars' && valorDolar) {
      return convertirAPesos(total, 0.15)
    }
    return total
  }, [moneda, total, valorDolar, convertirAPesos])

  useEffect(() => {
    const nuevoTotal = calcularTotal()
    if (nuevoTotal !== null) {
      onTotalChange(nuevoTotal)
    }
  }, [calcularTotal, onTotalChange])

  const handleMonedaChange = (nuevaMoneda) => {
    setMoneda(nuevaMoneda)
    onMonedaChange(nuevaMoneda)
  }

  const getTotalEnPesos = () => {
    if (!valorDolar) return null
    return convertirAPesos(total, 0.15)
  }

  const getRecargo = () => {
    if (!valorDolar) return null
    return Math.round(total * valorDolar * 0.15)
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-white">Seleccionar Moneda de Pago</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Dólares */}
        <motion.button
          onClick={() => handleMonedaChange('usd')}
          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
            moneda === 'usd'
              ? 'border-green-500 bg-green-500/20 text-green-400'
              : 'border-gray-600 hover:border-gray-500 text-gray-300'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">💵</div>
            <div className="font-semibold text-sm">Dólares (USD)</div>
            <div className="text-lg font-bold">
              ${total}.00 USD
            </div>
            <div className="text-xs opacity-80 mt-1">
              Sin recargo
            </div>
          </div>
        </motion.button>

        {/* Pesos */}
        <motion.button
          onClick={() => handleMonedaChange('ars')}
          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
            moneda === 'ars'
              ? 'border-blue-500 bg-blue-500/20 text-blue-400'
              : 'border-gray-600 hover:border-gray-500 text-gray-300'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">🇦🇷</div>
            <div className="font-semibold text-sm">Pesos (ARS)</div>
            {loading ? (
              <div className="text-sm">Cargando...</div>
            ) : error ? (
              <div className="text-sm text-red-400">Error</div>
            ) : (
              <>
                <div className="text-lg font-bold">
                  ${getTotalEnPesos()?.toLocaleString()} ARS
                </div>
                <div className="text-xs opacity-80 mt-1">
                  +15% recargo
                </div>
              </>
            )}
          </div>
        </motion.button>
      </div>

      {/* Información del dólar */}
      {moneda === 'ars' && valorDolar && (
        <motion.div
          className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-blue-300 text-sm">Valor del dólar:</span>
              <span className="text-white font-semibold">${valorDolar.toLocaleString()} ARS</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-blue-300 text-sm">Recargo (15%):</span>
              <span className="text-white font-semibold">${getRecargo()?.toLocaleString()} ARS</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-blue-300 text-sm">Total a pagar:</span>
              <span className="text-green-400 font-bold text-lg">${getTotalEnPesos()?.toLocaleString()} ARS</span>
            </div>

            {ultimaActualizacion && (
              <div className="text-xs text-blue-400 mt-2">
                Última actualización: {ultimaActualizacion.toLocaleTimeString('es-AR')}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Información importante */}
      <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          <div className="text-sm text-yellow-200">
            <p className="font-medium">Importante:</p>
            <ul className="mt-1 space-y-1 text-xs">
              <li>• El valor del dólar se actualiza automáticamente</li>
              <li>• El recargo del 15% se aplica al pago en pesos</li>
              <li>• El pago en dólares no tiene recargo adicional</li>
              <li>• Los precios se calculan en tiempo real</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SelectorMoneda
