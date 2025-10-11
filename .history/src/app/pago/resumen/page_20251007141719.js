'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

function PagoResumenContent() {
  const searchParams = useSearchParams()
  const [datosPago, setDatosPago] = useState(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener status de la URL
    const statusParam = searchParams.get('status')
    setStatus(statusParam || 'success')
    
    // Obtener datos del pago desde localStorage
    const datos = localStorage.getItem('datosRestaurante')
    if (datos) {
      setDatosPago(JSON.parse(datos))
    }
    
    setLoading(false)
  }, [searchParams])

  const getStatusInfo = () => {
    switch (status) {
      case 'success':
        return {
          title: '¡Pago Exitoso!',
          message: 'Tu pago ha sido procesado correctamente.',
          icon: '✅',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        }
      case 'error':
        return {
          title: 'Pago Fallido',
          message: 'Hubo un problema con tu pago. Intenta nuevamente.',
          icon: '❌',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        }
      case 'pending':
        return {
          title: 'Pago Pendiente',
          message: 'Tu pago está siendo procesado. Te notificaremos cuando se complete.',
          icon: '⏳',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        }
      default:
        return {
          title: 'Estado Desconocido',
          message: 'No se pudo determinar el estado del pago.',
          icon: '❓',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        }
    }
  }

  const statusInfo = getStatusInfo()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header con estado */}
        <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-2 rounded-lg p-6 mb-6`}>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{statusInfo.icon}</div>
            <div>
              <h1 className={`text-2xl font-bold ${statusInfo.color}`}>
                {statusInfo.title}
              </h1>
              <p className="text-gray-600 mt-1">{statusInfo.message}</p>
            </div>
          </div>
        </div>

        {/* Resumen del pedido */}
        {datosPago && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Resumen del Pedido</h2>
            
            {/* Información del restaurante */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Información del Restaurante</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Nombre:</span>
                  <span className="ml-2 text-gray-900">{datosPago.nombreRestaurante}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Propietario:</span>
                  <span className="ml-2 text-gray-900">{datosPago.nombrePropietario}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Email:</span>
                  <span className="ml-2 text-gray-900">{datosPago.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Teléfono:</span>
                  <span className="ml-2 text-gray-900">{datosPago.telefono}</span>
                </div>
              </div>
            </div>

            {/* Información del plan */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Detalles del Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Plan:</span>
                  <span className="ml-2 text-gray-900">{datosPago.plan === 'anual' ? 'Anual' : 'Mensual'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Dispositivos:</span>
                  <span className="ml-2 text-gray-900">{datosPago.cantidadDispositivos}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Con Finanzas:</span>
                  <span className="ml-2 text-gray-900">{datosPago.conFinanzas === 'si' ? 'Sí' : 'No'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Moneda:</span>
                  <span className="ml-2 text-gray-900">{datosPago.moneda === 'ars' ? 'ARS' : 'USD'}</span>
                </div>
              </div>
            </div>

            {/* Información del pago */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Información del Pago</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Método de pago:</span>
                  <span className="text-gray-900">Mercado Pago</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Estado:</span>
                  <span className={`font-semibold ${statusInfo.color}`}>
                    {status === 'success' ? 'Aprobado' : 
                     status === 'error' ? 'Rechazado' : 
                     status === 'pending' ? 'Pendiente' : 'Desconocido'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Fecha:</span>
                  <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Volver al Inicio
          </button>
          {status === 'success' && (
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium"
            >
              Ir al Dashboard
            </button>
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Si tienes alguna pregunta sobre tu pedido, 
            contáctanos a través de WhatsApp o email. Te enviaremos un resumen 
            detallado por correo electrónico.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function PagoResumen() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando resumen de pago...</p>
        </div>
      </div>
    }>
      <PagoResumenContent />
    </Suspense>
  )
}
