'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AdminTransferencias() {
  const [transferencias, setTransferencias] = useState([])
  const [filtro, setFiltro] = useState('pendientes')

  // Simular datos de transferencias pendientes
  useEffect(() => {
    const transferenciasPendientes = [
      {
        id: 1,
        referencia: 'QS-1703123456-ABC12',
        monto: 731745,
        moneda: 'ARS',
        fecha: '2024-01-15',
        estado: 'pendiente',
        comprobante: '/comprobantes/comprobante1.pdf',
        datosRestaurante: {
          nombre: 'Restaurante Ejemplo',
          email: 'admin@restaurante.com'
        }
      },
      {
        id: 2,
        referencia: 'QS-1703123457-DEF34',
        monto: 420,
        moneda: 'USD',
        fecha: '2024-01-14',
        estado: 'pendiente',
        comprobante: '/comprobantes/comprobante2.jpg',
        datosRestaurante: {
          nombre: 'Café Central',
          email: 'gerente@cafecentral.com'
        }
      }
    ]
    setTransferencias(transferenciasPendientes)
  }, [])

  const handleValidar = async (id, accion) => {
    try {
      // Aquí implementarías la lógica para validar/rechazar
      if (accion === 'aprobar') {
        // Activar servicio
        console.log('Aprobando transferencia:', id)
        // await activarServicio(id)
      } else {
        // Rechazar transferencia
        console.log('Rechazando transferencia:', id)
        // await rechazarTransferencia(id)
      }
      
      // Actualizar estado local
      setTransferencias(prev => 
        prev.map(t => 
          t.id === id 
            ? { ...t, estado: accion === 'aprobar' ? 'aprobado' : 'rechazado' }
            : t
        )
      )
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const transferenciasFiltradas = transferencias.filter(t => {
    if (filtro === 'pendientes') return t.estado === 'pendiente'
    if (filtro === 'aprobadas') return t.estado === 'aprobado'
    if (filtro === 'rechazadas') return t.estado === 'rechazado'
    return true
  })

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel de Transferencias</h1>
        
        {/* Filtros */}
        <div className="mb-6">
          <div className="flex space-x-4">
            {['pendientes', 'aprobadas', 'rechazadas', 'todas'].map(filtroOption => (
              <button
                key={filtroOption}
                onClick={() => setFiltro(filtroOption)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filtro === filtroOption
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filtroOption.charAt(0).toUpperCase() + filtroOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Transferencias */}
        <div className="grid gap-6">
          {transferenciasFiltradas.map(transferencia => (
            <motion.div
              key={transferencia.id}
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {transferencia.datosRestaurante.nombre}
                  </h3>
                  <p className="text-gray-600">{transferencia.datosRestaurante.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    ${transferencia.monto.toLocaleString()} {transferencia.moneda}
                  </div>
                  <div className="text-sm text-gray-500">{transferencia.fecha}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-medium text-gray-600">Referencia:</span>
                  <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">
                    {transferencia.referencia}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Estado:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
                    transferencia.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                    transferencia.estado === 'aprobado' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {transferencia.estado.charAt(0).toUpperCase() + transferencia.estado.slice(1)}
                  </span>
                </div>
              </div>

              {/* Comprobante */}
              <div className="mb-4">
                <span className="font-medium text-gray-600">Comprobante:</span>
                <a
                  href={transferencia.comprobante}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Ver comprobante
                </a>
              </div>

              {/* Acciones */}
              {transferencia.estado === 'pendiente' && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleValidar(transferencia.id, 'aprobar')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleValidar(transferencia.id, 'rechazar')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Rechazar
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {transferenciasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay transferencias {filtro}</p>
          </div>
        )}
      </div>
    </div>
  )
}
