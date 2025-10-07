'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import TarjetaModal from '@/components/pago/TarjetaModal'

export default function PagoPage() {
  const searchParams = useSearchParams()
  
  // Obtener datos del formulario anterior
  const plan = searchParams.get('plan') || 'mensual'
  const precio = searchParams.get('precio') || '42'
  const nombreRestaurante = searchParams.get('nombreRestaurante') || ''
  const nombrePropietario = searchParams.get('nombrePropietario') || ''
  const email = searchParams.get('email') || ''
  const telefono = searchParams.get('telefono') || ''
  const direccion = searchParams.get('direccion') || ''
  const conFinanzas = searchParams.get('conFinanzas') || 'no'
  const cantidadDispositivos = searchParams.get('cantidadDispositivos') || '3'
  const codigoActivacion = searchParams.get('codigoActivacion') || ''
  const moneda = searchParams.get('moneda') || 'usd'
  const totalFinal = searchParams.get('totalFinal') || precio

  const [formaPago, setFormaPago] = useState('')
  const [procesando, setProcesando] = useState(false)
  const [mostrarModalTarjeta, setMostrarModalTarjeta] = useState(false)

  const handlePago = async (metodo) => {
    setFormaPago(metodo)
    
    if (metodo === 'Tarjeta de Crédito') {
      setMostrarModalTarjeta(true)
    } else {
      setProcesando(true)
      // Simular procesamiento de pago para otros métodos
      setTimeout(() => {
        setProcesando(false)
        alert(`¡Pago procesado con ${metodo}! Redirigiendo al dashboard...`)
      }, 2000)
    }
  }

  const handlePagoTarjeta = async (datosTarjeta, tipoTarjeta, cuotas) => {
    setProcesando(true)
    setMostrarModalTarjeta(false)
    
    // Simular procesamiento de pago con tarjeta
    setTimeout(() => {
      setProcesando(false)
      const mensajeCuotas = cuotas === 1 
        ? 'pago único' 
        : `${cuotas} cuotas de $${(desglose.total / cuotas).toFixed(2)} USD`
      
      alert(`¡Pago procesado con tarjeta ${tipoTarjeta.toUpperCase()} en ${mensajeCuotas}! Redirigiendo al dashboard...`)
    }, 2000)
  }

  const calcularDesglose = () => {
    const precioBase = plan === 'anual' ? 420 : 42
    const dispositivosIncluidos = plan === 'anual' ? 3 : 2
    const dispositivosExtra = Math.max(0, parseInt(cantidadDispositivos) - dispositivosIncluidos)
    const precioDispositivosExtra = dispositivosExtra * 6
    const precioFinanzas = conFinanzas === 'si' ? 5 : 0
    
    return {
      precioBase,
      dispositivosExtra,
      precioDispositivosExtra,
      precioFinanzas,
      total: parseFloat(totalFinal) || (precioBase + precioDispositivosExtra + precioFinanzas)
    }
  }

  const desglose = calcularDesglose()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Título */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Resumen y Pago
            </h1>
            <p className="text-gray-300">
              Revisa tu pedido y completa el pago
            </p>
            {moneda === 'ars' && (
              <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-300 text-sm">💱</span>
                  <span className="text-blue-300 text-sm">
                    Pago en Pesos Argentinos (ARS) con recargo del 15%
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Resumen del Pedido */}
            <motion.div 
              className="bg-gray-800 rounded-2xl p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Resumen del Pedido</h2>
              
              {/* Información del Restaurante */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Información del Restaurante</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Restaurante:</span>
                    <span className="text-white">{nombreRestaurante || 'No especificado'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Propietario:</span>
                    <span className="text-white">{nombrePropietario || 'No especificado'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Email:</span>
                    <span className="text-white">{email || 'No especificado'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Teléfono:</span>
                    <span className="text-white">{telefono || 'No especificado'}</span>
                  </div>
                </div>
              </div>

              {/* Configuración del Servicio */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Configuración del Servicio</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Plan:</span>
                    <span className="text-white">{plan === 'anual' ? 'Plan Anual' : 'Plan Mensual'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Dispositivos:</span>
                    <span className="text-white">{cantidadDispositivos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Usuarios:</span>
                    <span className="text-white">1 (Admin por defecto)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Módulo de Finanzas:</span>
                    <span className="text-white">{conFinanzas === 'si' ? 'Sí' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Código de Activación:</span>
                    <span className="text-white font-mono">{codigoActivacion}</span>
                  </div>
                </div>
              </div>

              {/* Desglose de Precios */}
              <div className="border-t border-gray-600 pt-6">
                <h3 className="text-lg font-semibold text-white mb-3">Desglose de Precios</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">
                      {plan === 'anual' ? 'Plan Anual' : 'Plan Mensual'}:
                    </span>
                    <span className="text-white">${desglose.precioBase}.00 USD</span>
                  </div>
                  {desglose.precioDispositivosExtra > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">
                        Dispositivos extra ({desglose.dispositivosExtra} x $6):
                      </span>
                      <span className="text-white">${desglose.precioDispositivosExtra}.00 USD</span>
                    </div>
                  )}
                  {desglose.precioFinanzas > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Módulo de Finanzas:</span>
                      <span className="text-white">${desglose.precioFinanzas}.00 USD</span>
                    </div>
                  )}
                  <div className="border-t border-gray-600 pt-2 flex justify-between font-semibold text-lg">
                    <span className="text-white">Total:</span>
                    <span className="text-green-400">
                      ${desglose.total.toLocaleString()} {moneda === 'usd' ? 'USD' : 'ARS'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Opciones de Pago */}
            <motion.div 
              className="bg-gray-800 rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Forma de Pago</h2>
              
              <div className="space-y-4">
                {/* Tarjeta de Crédito */}
                <motion.button
                  onClick={() => handlePago('Tarjeta de Crédito')}
                  disabled={procesando}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                    formaPago === 'tarjeta' 
                      ? 'border-blue-500 bg-blue-500/20' 
                      : 'border-gray-600 hover:border-blue-400 hover:bg-blue-500/10'
                  } ${procesando ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: procesando ? 1 : 1.02 }}
                  whileTap={{ scale: procesando ? 1 : 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold">Tarjeta de Crédito</div>
                      <div className="text-gray-400 text-sm">Visa, Mastercard, American Express</div>
                    </div>
                  </div>
                </motion.button>

                {/* Transferencia Bancaria */}
                <motion.button
                  onClick={() => handlePago('Transferencia Bancaria')}
                  disabled={procesando}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                    formaPago === 'transferencia' 
                      ? 'border-green-500 bg-green-500/20' 
                      : 'border-gray-600 hover:border-green-400 hover:bg-green-500/10'
                  } ${procesando ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: procesando ? 1 : 1.02 }}
                  whileTap={{ scale: procesando ? 1 : 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold">Transferencia Bancaria</div>
                      <div className="text-gray-400 text-sm">Pago directo desde tu banco</div>
                    </div>
                  </div>
                </motion.button>


                {/* Mercado Pago */}
                <motion.button
                  onClick={() => handlePago('Mercado Pago')}
                  disabled={procesando}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                    formaPago === 'mercadopago' 
                      ? 'border-blue-500 bg-blue-500/20' 
                      : 'border-gray-600 hover:border-blue-400 hover:bg-blue-500/10'
                  } ${procesando ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: procesando ? 1 : 1.02 }}
                  whileTap={{ scale: procesando ? 1 : 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold">Mercado Pago</div>
                      <div className="text-gray-400 text-sm">Pago con tarjeta, efectivo o transferencia</div>
                    </div>
                  </div>
                </motion.button>
              </div>


              {/* Información de Seguridad */}
              <div className="mt-8 p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-white font-semibold">Pago 100% Seguro</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Todos los pagos están protegidos con encriptación SSL de 256 bits. 
                  No almacenamos información de tarjetas de crédito.
                </p>
              </div>

              {/* Botón de Volver */}
              <div className="mt-6">
                <motion.button
                  onClick={() => window.history.back()}
                  className="w-full py-3 px-6 border-2 border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Volver al Formulario
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal de Tarjeta */}
      <TarjetaModal
        isOpen={mostrarModalTarjeta}
        onClose={() => setMostrarModalTarjeta(false)}
        onPagar={handlePagoTarjeta}
        total={desglose.total}
      />
    </div>
  )
}
