import { NextResponse } from 'next/server';

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

export async function POST(request) {
  try {
    const { total, moneda, datosRestaurante } = await request.json();
    
    // Crear preferencia para transferencia bancaria
    const preference = {
      items: [
        {
          title: `Plan Anual - Quick Solution (Transferencia)`,
          quantity: 1,
          unit_price: total,
          currency_id: moneda === 'ars' ? 'ARS' : 'USD',
        }
      ],
      payer: {
        name: datosRestaurante.nombrePropietario,
        email: datosRestaurante.email,
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/exito`,
        failure: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/error`,
        pending: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/pendiente`,
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [
          { id: 'credit_card' },
          { id: 'debit_card' }
        ],
        included_payment_types: [
          { id: 'bank_transfer' }
        ]
      },
      notification_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/mercadopago/webhook`,
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });

    if (!response.ok) {
      throw new Error(`Mercado Pago API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      preferenceId: data.id,
      initPoint: data.init_point 
    });
  } catch (error) {
    console.error('Error creating transfer preference:', error);
    return NextResponse.json({ error: 'Error al crear la preferencia de transferencia' }, { status: 500 });
  }
}
