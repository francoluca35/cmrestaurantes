'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CuotasSelector from './CuotasSelector'
import ResumenCuotas from './ResumenCuotas'

const TarjetaModal = ({ isOpen, onClose, onPagar, total, moneda = 'usd', tipoTarjeta = 'Tarjeta de Crédito' }) => {
  const [datosTarjeta, setDatosTarjeta] = useState({
    numero: '',
    nombre: '',
    vencimiento: '',
    cvv: ''
  })
  const [tipoTarjetaDetectada, setTipoTarjetaDetectada] = useState('')
  const [focusedField, setFocusedField] = useState('')
  const [cuotas, setCuotas] = useState(1)
  const [mostrarCuotas, setMostrarCuotas] = useState(false)
  const [tarjetaVolteada, setTarjetaVolteada] = useState(false)

  // Detectar tipo de tarjeta basado en el número
  const detectarTipoTarjeta = (numero) => {
    const num = numero.replace(/\s/g, '')
    
    if (num.startsWith('4')) return 'visa'
    if (num.startsWith('5') || num.startsWith('2')) return 'mastercard'
    if (num.startsWith('3')) return 'amex'
    if (num.startsWith('6')) return 'discover'
    
    return ''
  }

  // Obtener tarjetas aptas según la moneda
  const getTarjetasAptas = (moneda) => {
    if (moneda === 'usd') {
      return ['Visa', 'Mastercard', 'American Express', 'Discover']
    } else {
      return ['Visa', 'Mastercard', 'American Express']
    }
  }

  // Verificar si la tarjeta detectada es apta para la moneda
  const esTarjetaApta = (tipoTarjeta, moneda) => {
    const tarjetasAptas = getTarjetasAptas(moneda)
    const nombreTarjeta = tipoTarjeta === 'visa' ? 'Visa' :
                         tipoTarjeta === 'mastercard' ? 'Mastercard' :
                         tipoTarjeta === 'amex' ? 'American Express' :
                         tipoTarjeta === 'discover' ? 'Discover' : ''
    return tarjetasAptas.includes(nombreTarjeta)
  }

  // Obtener icono de tarjeta
  const getTarjetaIcon = (tipo) => {
    switch (tipo) {
      case 'visa':
        return (
          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">VISA</span>
          </div>
        )
      case 'mastercard':
        return (
          <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center relative">
            <div className="w-4 h-4 bg-orange-400 rounded-full absolute left-1"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full absolute right-1"></div>
          </div>
        )
      case 'amex':
        return (
          <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">AMEX</span>
          </div>
        )
      case 'discover':
        return (
          <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">DISC</span>
          </div>
        )
      default:
        return (
          <div className="w-12 h-8 bg-gray-400 rounded flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
            </svg>
          </div>
        )
    }
  }

  // Formatear número de tarjeta
  const formatearNumero = (value) => {
    const num = value.replace(/\s/g, '')
    const tipo = detectarTipoTarjeta(num)
    setTipoTarjetaDetectada(tipo)
    
    if (tipo === 'amex') {
      return num.replace(/(.{4})/g, '$1 ').trim()
    } else {
      return num.replace(/(.{4})/g, '$1 ').trim()
    }
  }

  // Formatear fecha de vencimiento
  const formatearFecha = (value) => {
    return value.replace(/\D/g, '').replace(/(.{2})/, '$1/')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value
    
    if (name === 'numero') {
      formattedValue = formatearNumero(value)
    } else if (name === 'vencimiento') {
      formattedValue = formatearFecha(value)
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '')
    }
    
    setDatosTarjeta(prev => ({
      ...prev,
      [name]: formattedValue
    }))
  }

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName)
    if (fieldName === 'cvv') {
      setTarjetaVolteada(true)
    } else {
      setTarjetaVolteada(false)
    }
  }

  const handleBlur = () => {
    setFocusedField('')
    setTarjetaVolteada(false)
  }

  const handlePagar = () => {
    if (!datosTarjeta.numero || !datosTarjeta.nombre || !datosTarjeta.vencimiento || !datosTarjeta.cvv) {
      alert('Por favor completa todos los campos')
      return
    }
    
    onPagar(datosTarjeta, tipoTarjetaDetectada, cuotas)
  }

  const handleCuotasChange = (nuevasCuotas) => {
    setCuotas(nuevasCuotas)
  }

  const resetForm = () => {
    setDatosTarjeta({
      numero: '',
      nombre: '',
      vencimiento: '',
      cvv: ''
    })
    setTipoTarjetaDetectada('')
    setFocusedField('')
    setCuotas(1)
    setMostrarCuotas(false)
    setTarjetaVolteada(false)
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  // Resetear cuotas a 1 cuando es tarjeta de débito
  useEffect(() => {
    if (tipoTarjeta === 'Tarjeta de Débito') {
      setCuotas(1)
    }
  }, [tipoTarjeta])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{tipoTarjeta}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
               <p className="text-gray-600 mt-2">
                 Total a pagar: <span className="font-semibold text-green-600">
                   ${total.toLocaleString()} {moneda === 'usd' ? 'USD' : 'ARS'}
                 </span>
               </p>
               <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                 <p className="text-sm text-blue-800 font-medium mb-1">
                   Tarjetas aceptadas para {moneda === 'usd' ? 'USD' : 'ARS'}:
                 </p>
                 <div className="flex flex-wrap gap-2">
                   {getTarjetasAptas(moneda).map((tarjeta, index) => (
                     <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                       {tarjeta}
                     </span>
                   ))}
                 </div>
               </div>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              {/* Tarjeta Visual */}
              <div className="relative h-48">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 text-white shadow-lg"
                  animate={{ rotateY: tarjetaVolteada ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Frente de la tarjeta */}
                  <div className={`${tarjetaVolteada ? 'hidden' : 'block'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-6 bg-yellow-400 rounded-sm flex items-center justify-center">
                          <div className="w-4 h-3 bg-yellow-300 rounded-sm"></div>
                        </div>
                        {tipoTarjetaDetectada && getTarjetaIcon(tipoTarjetaDetectada)}
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-80">CREDIT CARD</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-2xl font-mono tracking-wider">
                        {datosTarjeta.numero || '•••• •••• •••• ••••'}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs opacity-80 mb-1">CARDHOLDER NAME</div>
                        <div className="text-sm font-semibold">
                          {datosTarjeta.nombre || 'FULL NAME'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs opacity-80 mb-1">VALID THRU</div>
                        <div className="text-sm font-semibold">
                          {datosTarjeta.vencimiento || 'MM/YY'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reverso de la tarjeta */}
                  <div className={`${tarjetaVolteada ? 'block' : 'hidden'}`}>
                    <div className="h-full flex flex-col justify-between">
                      {/* Banda magnética */}
                      <div className="w-full h-12 bg-gray-800 rounded-sm mt-4"></div>
                      
                      {/* Área de firma */}
                      <div className="flex-1 bg-gray-700 rounded-sm p-2 mt-4">
                        <div className="text-xs text-gray-400 mb-1">AUTHORIZED SIGNATURE</div>
                        <div className="h-8 bg-gray-600 rounded"></div>
                      </div>
                      
                      {/* CVV */}
                      <div className="flex justify-end mt-4">
                        <div className="bg-white text-black px-3 py-1 rounded text-sm font-mono">
                          {datosTarjeta.cvv || '•••'}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
                
                {/* Mensaje de advertencia si la tarjeta no es apta */}
                {tipoTarjetaDetectada && !esTarjetaApta(tipoTarjetaDetectada, moneda) && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      <p className="text-sm text-red-700">
                        Esta tarjeta no es compatible con pagos en {moneda === 'usd' ? 'USD' : 'ARS'}. 
                        Por favor usa una tarjeta aceptada.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Formulario */}
              <div className="space-y-4">
                {/* Número de Tarjeta */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    name="numero"
                    value={datosTarjeta.numero}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('numero')}
                    onBlur={handleBlur}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  />
                </div>

                {/* Nombre del Titular */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Titular
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={datosTarjeta.nombre}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('nombre')}
                    onBlur={handleBlur}
                    placeholder="JUAN PEREZ"
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Fecha y CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vencimiento
                    </label>
                    <input
                      type="text"
                      name="vencimiento"
                      value={datosTarjeta.vencimiento}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('vencimiento')}
                      onBlur={handleBlur}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={datosTarjeta.cvv}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('cvv')}
                      placeholder="123"
                      maxLength="4"
                      className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
               </div>

               {/* Selector de Cuotas - Solo para tarjetas de crédito */}
               {tipoTarjeta && tipoTarjeta === 'Tarjeta de Crédito' && (
                 <motion.div
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                   transition={{ duration: 0.3 }}
                 >
                   <CuotasSelector
                     total={total}
                     onCuotasChange={handleCuotasChange}
                     tipoTarjeta={tipoTarjetaDetectada}
                   />
                 </motion.div>
               )}

               {/* Resumen de Cuotas - Solo para tarjetas de crédito */}
               {cuotas > 1 && tipoTarjeta === 'Tarjeta de Crédito' && (
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.3 }}
                 >
                   <ResumenCuotas
                     total={total}
                     cuotas={cuotas}
                     tipoTarjeta={tipoTarjetaDetectada}
                   />
                 </motion.div>
               )}

               {/* Botones */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Cancelar
                </button>
                 <button
                   onClick={handlePagar}
                   disabled={tipoTarjetaDetectada && !esTarjetaApta(tipoTarjetaDetectada, moneda)}
                   className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 font-medium ${
                     tipoTarjetaDetectada && !esTarjetaApta(tipoTarjetaDetectada, moneda)
                       ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                       : 'bg-blue-600 hover:bg-blue-700 text-white'
                   }`}
                 >
                   {tipoTarjeta === 'Tarjeta de Débito' 
                     ? `Pagar $${total.toLocaleString()} ${moneda === 'usd' ? 'USD' : 'ARS'}` 
                     : cuotas === 1 
                       ? `Pagar $${total.toLocaleString()} ${moneda === 'usd' ? 'USD' : 'ARS'}` 
                       : `Pagar ${cuotas} cuotas de $${(total / cuotas).toFixed(2)} ${moneda === 'usd' ? 'USD' : 'ARS'}`
                   }
                 </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TarjetaModal
