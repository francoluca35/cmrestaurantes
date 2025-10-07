'use client'

import { useState, useEffect } from 'react'

export default function PayPalButton({ amount, onSuccess, onError }) {
  const [paypalLoaded, setPaypalLoaded] = useState(false)

  useEffect(() => {
    // Cargar el script de PayPal
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`
    script.async = true
    script.onload = () => setPaypalLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: amount.toString()
        }
      }]
    })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      onSuccess(details)
    })
  }

  if (!paypalLoaded) {
    return <div className="p-4 text-center">Cargando PayPal...</div>
  }

  return (
    <div id="paypal-button-container">
      {/* El botón de PayPal se renderizará aquí */}
    </div>
  )
}
