'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

export default function RegistroPage() {
  const searchParams = useSearchParams()
  const planSeleccionado = searchParams.get('plan') || 'mensual'
  const precio = searchParams.get('precio') || '$42/mes'

  const [formData, setFormData] = useState({
    // Información del Restaurante
    nombreRestaurante: '',
    nombrePropietario: '',
    dniPropietario: '12345678',
    email: 'restaurante@ejemplo.com',
    telefono: '+54 11 1234-5678',
    direccion: 'Av. Corrientes 1234, CABA',
    
    // Configuración del Servicio
    tipoServicio: '',
    formaPago: '',
    periodicidad: planSeleccionado,
    cantidadDispositivos: 3,
    precioBase: planSeleccionado === 'anual' ? 420 : 42,
    precioDispositivosExtra: 0,
    precioTotal: planSeleccionado === 'anual' ? 420 : 42,
    
    // Configuración
    cantidadUsuarios: '1',
    codigoActivacion: 'ABC123',
    password: '',
    logoUrl: 'https://ejemplo.com/logo.png'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      }
      
      // Recalcular precio total si cambia la cantidad de dispositivos
      if (name === 'cantidadDispositivos') {
        const dispositivos = parseInt(value) || 0
        const dispositivosExtra = Math.max(0, dispositivos - 2) // 2 dispositivos incluidos
        const precioDispositivosExtra = dispositivosExtra * 6
        const precioTotal = newData.precioBase + precioDispositivosExtra
        
        newData.precioDispositivosExtra = precioDispositivosExtra
        newData.precioTotal = precioTotal
      }
      
      return newData
    })
  }

  const generateNewCode = () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    setFormData(prev => ({
      ...prev,
      codigoActivacion: newCode
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para procesar el formulario
    console.log('Datos del formulario:', formData)
    alert('¡Registro completado! Redirigiendo al pago...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          {/* Columna Izquierda - Plan Seleccionado */}
          <motion.div 
            className="bg-gradient-to-br from-purple-800 to-violet-900 rounded-2xl p-8 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              {planSeleccionado === 'anual' ? 'Plan Anual' : 'Plan Mensual'}
            </h2>
            
            <div className="text-4xl font-bold text-purple-300 mb-4">
              {planSeleccionado === 'anual' ? '$420/año' : '$42/mes'}
            </div>
            
            <p className="text-blue-300 mb-2">
              Acceso completo a todas las funcionalidades
            </p>
            <p className="text-sm text-gray-300 mb-2">
              2 dispositivos incluidos
            </p>
            <p className="text-sm text-gray-300 mb-6">
              $6 cada dispositivo extra
            </p>
            
            <div className="space-y-3">
              {[
                'Gestión de mesas y pedidos',
                'Sistema de delivery y takeaway',
                'Control de inventario',
                'Facturación automática',
                'Reportes y estadísticas',
                'Soporte técnico 24/7',
                'Actualizaciones gratuitas',
                '2 Usuarios de manera predeterminada'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Columna Derecha - Formulario */}
          <motion.div 
            className="bg-gray-800 rounded-2xl p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold text-white mb-8">
              Registra un nuevo restaurante en el sistema
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Información del Restaurante */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Información del Restaurante</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre del Restaurante <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombreRestaurante"
                      value={formData.nombreRestaurante}
                      onChange={handleInputChange}
                      placeholder="Ej: La Parrilla del Sur"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre Completo del Propietario <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombrePropietario"
                      value={formData.nombrePropietario}
                      onChange={handleInputChange}
                      placeholder="Ej: Juan Carlos Pérez"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      DNI del Propietario <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="dniPropietario"
                      value={formData.dniPropietario}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Dirección <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Configuración del Servicio */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Configuración del Servicio</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tipo de Servicio <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="tipoServicio"
                      value={formData.tipoServicio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      <option value="basico">Básico</option>
                      <option value="premium">Premium</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Forma de Pago <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="formaPago"
                      value={formData.formaPago}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      <option value="tarjeta">Tarjeta de Crédito</option>
                      <option value="transferencia">Transferencia Bancaria</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Periodicidad <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="periodicidad"
                      value={formData.periodicidad}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="mensual">Mensual</option>
                      <option value="anual">Anual</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cantidad de Dispositivos <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="cantidadDispositivos"
                      value={formData.cantidadDispositivos}
                      onChange={handleInputChange}
                      min="2"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      2 dispositivos incluidos, $6 por cada extra
                    </p>
                  </div>
                </div>
                
                {/* Desglose de precios */}
                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-3">Desglose de Precios</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">
                        {formData.periodicidad === 'anual' ? 'Plan Anual' : 'Plan Mensual'}:
                      </span>
                      <span className="text-white">${formData.precioBase}.00 USD</span>
                    </div>
                    {formData.precioDispositivosExtra > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">
                          Dispositivos extra ({formData.cantidadDispositivos - 2} x $6):
                        </span>
                        <span className="text-white">${formData.precioDispositivosExtra}.00 USD</span>
                      </div>
                    )}
                    <div className="border-t border-gray-600 pt-2 flex justify-between font-semibold">
                      <span className="text-white">Total:</span>
                      <span className="text-green-400">${formData.precioTotal}.00 USD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuración */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Configuración</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cantidad de Usuarios <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="cantidadUsuarios"
                      value={formData.cantidadUsuarios}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Código de Activación <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="codigoActivacion"
                        value={formData.codigoActivacion}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={generateNewCode}
                        className="px-4 py-3 bg-gray-600 border border-l-0 border-gray-600 rounded-r-lg hover:bg-gray-500 transition-colors"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contraseña <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Ingresa la contraseña"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Logo (URL)
                    </label>
                    <input
                      type="url"
                      name="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Botón de envío */}
              <motion.button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Terminar y pagar
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
