'use client'

import { useState, useEffect } from 'react'

const useDolar = () => {
  const [valorDolar, setValorDolar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null)

  const obtenerValorDolar = async () => {
    try {
      setLoading(true)
      setError(null)

      // Intentar obtener el valor del dólar desde una API
      const response = await fetch('/api/dolar')
      const data = await response.json()

      if (data.success) {
        setValorDolar(data.valor)
        setUltimaActualizacion(new Date())
      } else {
        throw new Error(data.error || 'Error al obtener el valor del dólar')
      }
    } catch (err) {
      console.error('Error al obtener valor del dólar:', err)
      setError(err.message)
      
      // Valor de respaldo si falla la API
      setValorDolar(1000) // Valor aproximado de respaldo
      setUltimaActualizacion(new Date())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    obtenerValorDolar()
    
    // Actualizar cada 30 minutos
    const interval = setInterval(obtenerValorDolar, 30 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const convertirAPesos = (dolares, recargo = 0.15) => {
    if (!valorDolar) return null
    
    const valorConRecargo = dolares * valorDolar * (1 + recargo)
    return Math.round(valorConRecargo)
  }

  const convertirADolares = (pesos, recargo = 0.15) => {
    if (!valorDolar) return null
    
    const valorSinRecargo = pesos / (valorDolar * (1 + recargo))
    return Math.round(valorSinRecargo * 100) / 100
  }

  return {
    valorDolar,
    loading,
    error,
    ultimaActualizacion,
    convertirAPesos,
    convertirADolares,
    recargar: obtenerValorDolar
  }
}

export default useDolar
