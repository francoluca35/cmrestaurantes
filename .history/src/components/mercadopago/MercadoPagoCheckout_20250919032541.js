'use client'

import { useState, useEffect } from 'react'

export default function MercadoPagoCheckout({ amount, onSuccess, onError }) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      // Crear preferencia de pago
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount: amount,
          description: 'Suscripción CM Restaurantes'
        })
      })

      const { init_point } = await response.json()
      
      // Redirigir a Mercado Pago
      window.location.href = init_point
      
    } catch (error) {
      onError(error)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 text-sm">
          Serás redirigido a Mercado Pago para completar tu pago de forma segura.
        </p>
      </div>
      
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        {loading ? 'Procesando...' : `Pagar $${amount} USD con Mercado Pago`}
      </button>
    </div>
  )
}
