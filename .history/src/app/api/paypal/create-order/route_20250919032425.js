import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { amount } = await request.json()
    
    const accessToken = await getPayPalAccessToken()
    
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: amount.toString()
        }
      }]
    }

    const response = await fetch(`${process.env.PAYPAL_MODE === 'sandbox' 
      ? 'https://api-m.sandbox.paypal.com' 
      : 'https://api-m.paypal.com'}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': Math.random().toString(36).substring(7)
      },
      body: JSON.stringify(orderData)
    })

    const order = await response.json()
    
    return NextResponse.json({ orderId: order.id })
  } catch (error) {
    console.error('Error creating PayPal order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64')

  const response = await fetch(`${process.env.PAYPAL_MODE === 'sandbox' 
    ? 'https://api-m.sandbox.paypal.com' 
    : 'https://api-m.paypal.com'}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })

  const data = await response.json()
  return data.access_token
}
