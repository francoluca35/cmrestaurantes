import { NextResponse } from 'next/server';

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

export async function GET() {
  try {
    console.log('=== TESTING MERCADO PAGO CREDENTIALS ===');
    console.log('ACCESS_TOKEN:', MERCADOPAGO_ACCESS_TOKEN ? 'CONFIGURADO' : 'NO CONFIGURADO');
    
    if (!MERCADOPAGO_ACCESS_TOKEN) {
      return NextResponse.json({ 
        error: 'ACCESS_TOKEN no configurado',
        status: 'error'
      }, { status: 500 });
    }

    // Hacer una petición simple a la API de Mercado Pago para verificar las credenciales
    const response = await fetch('https://api.mercadopago.com/v1/payment_methods', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      
      return NextResponse.json({ 
        error: `Credenciales inválidas: ${response.status} - ${errorText}`,
        status: 'error',
        details: {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        }
      }, { status: 500 });
    }

    const data = await response.json();
    console.log('Success! Payment methods:', data.length);

    return NextResponse.json({ 
      message: 'Credenciales válidas',
      status: 'success',
      paymentMethods: data.length
    });

  } catch (error) {
    console.error('Error testing credentials:', error);
    return NextResponse.json({ 
      error: `Error al verificar credenciales: ${error.message}`,
      status: 'error'
    }, { status: 500 });
  }
}
