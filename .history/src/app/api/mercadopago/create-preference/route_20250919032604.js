import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  options: {
    timeout: 5000,
    idempotencyKey: 'abc'
  }
})

export async function POST(request) {
  try {
    const { amount, description } = await request.json()

    const preference = new Preference(client)

    const result = await preference.create({
      body: {
        items: [
          {
            id: 'subscription',
            title: description,
            quantity: 1,
            unit_price: amount,
            currency_id: 'USD'
          }
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/pago/success`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/pago/failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pago/pending`
        },
        auto_return: 'approved',
        notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercadopago/webhook`
      }
    })

    return NextResponse.json({ 
      init_point: result.init_point,
      preference_id: result.id
    })
  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error)
    return NextResponse.json(
      { error: 'Failed to create preference' }, 
      { status: 500 }
    )
  }
}
