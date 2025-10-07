'use client'

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

export default function PayPalCheckout({ amount, onSuccess, onError }) {
  const paypalOptions = {
    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture'
  }

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: amount.toString(),
          currency_code: 'USD'
        }
      }]
    })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      onSuccess(details)
    })
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        style={{
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        }}
      />
    </PayPalScriptProvider>
  )
}
