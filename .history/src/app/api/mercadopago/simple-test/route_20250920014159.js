import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('=== SIMPLE TEST ===');
    
    const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
    console.log('ACCESS_TOKEN:', MERCADOPAGO_ACCESS_TOKEN ? 'CONFIGURADO' : 'NO CONFIGURADO');
    
    if (!MERCADOPAGO_ACCESS_TOKEN) {
      return NextResponse.json({ error: 'ACCESS_TOKEN no configurado' }, { status: 500 });
    }

    // Test simple con fetch directo
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            title: 'Test - Quick Solution',
            quantity: 1,
            unit_price: 100,
            currency_id: 'ARS',
          }
        ],
        payer: {
          name: 'Test User',
          email: 'test@test.com',
        },
      back_urls: {
        success: 'http://localhost:3000/pago/resumen?status=success',
        failure: 'http://localhost:3000/pago/resumen?status=error',
        pending: 'http://localhost:3000/pago/resumen?status=pending',
      },
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      return NextResponse.json({ 
        error: `Error ${response.status}: ${errorData.message || 'Error desconocido'}`,
        details: errorData
      }, { status: response.status });
    }

    const result = await response.json();
    console.log('Success response:', result);
    
    return NextResponse.json({ 
      message: 'Test exitoso con fetch directo',
      result: result
    });

  } catch (error) {
    console.error('Error en test simple:', error);
    return NextResponse.json({ 
      error: `Error en test simple: ${error.message}`,
      stack: error.stack
    }, { status: 500 });
  }
}
