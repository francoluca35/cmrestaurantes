'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TransferenciaModal = ({ isOpen, onClose, total, moneda = 'usd' }) => {
  const [comprobante, setComprobante] = useState(null)
  const [procesando, setProcesando] = useState(false)

  // Generar datos bancarios únicos
  const generarDatosBancarios = () => {
    const referencia = `QS-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    
    return {
      banco: 'Banco Galicia',
      cbu: '0070123456789012345678',
      alias: 'QUICK.SOLUTION.CM',
      titular: 'Quick Solution S.A.',
      cuit: '30-12345678-9',
      referencia: referencia,
      monto: total,
      moneda: moneda.toUpperCase()
    }
  }

  const datosBancarios = generarDatosBancarios()

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf') {
      setComprobante(file)
    } else {
      alert('Por favor sube un archivo JPG, PNG o PDF')
    }
  }

  const handleEnviarComprobante = async () => {
    if (!comprobante) {
      alert('Por favor sube el comprobante de transferencia')
      return
    }

    setProcesando(true)

    try {
      // Aquí enviarías el comprobante al backend
      const formData = new FormData()
      formData.append('comprobante', comprobante)
      formData.append('referencia', datosBancarios.referencia)
      formData.append('monto', total)
      formData.append('moneda', moneda)

      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Comprobante enviado. Te contactaremos en 24-48hs para confirmar el pago.')
      onClose()
    } catch (error) {
      console.error('Error:', error)
      alert('Error al enviar el comprobante. Intenta nuevamente.')
    } finally {
      setProcesando(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Transferencia Bancaria</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              {/* Instrucciones */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Instrucciones de Pago</h3>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Realiza una transferencia bancaria con los datos que aparecen abajo</li>
                  <li>Usa la referencia exacta para que podamos identificar tu pago</li>
                  <li>Sube el comprobante de transferencia</li>
                  <li>Te contactaremos en 24-48hs para confirmar y activar tu servicio</li>
                </ol>
              </div>

              {/* Datos Bancarios */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Datos para la Transferencia</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Banco:</span>
                    <span className="ml-2 text-gray-900">{datosBancarios.banco}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">CBU:</span>
                    <span className="ml-2 text-gray-900 font-mono">{datosBancarios.cbu}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Alias:</span>
                    <span className="ml-2 text-gray-900 font-mono">{datosBancarios.alias}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Titular:</span>
                    <span className="ml-2 text-gray-900">{datosBancarios.titular}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">CUIT:</span>
                    <span className="ml-2 text-gray-900">{datosBancarios.cuit}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Referencia:</span>
                    <span className="ml-2 text-gray-900 font-mono bg-yellow-100 px-2 py-1 rounded">
                      {datosBancarios.referencia}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-yellow-800 font-medium">
                      Monto exacto: ${total.toLocaleString()} {datosBancarios.moneda}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subir Comprobante */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="comprobante"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="comprobante"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  <span className="text-gray-600">
                    {comprobante ? comprobante.name : 'Haz clic para subir el comprobante'}
                  </span>
                  <span className="text-sm text-gray-500">JPG, PNG o PDF (máx. 5MB)</span>
                </label>
              </div>

              {/* Botones */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEnviarComprobante}
                  disabled={!comprobante || procesando}
                  className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 font-medium ${
                    !comprobante || procesando
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {procesando ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </div>
                  ) : (
                    'Enviar Comprobante'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TransferenciaModal
