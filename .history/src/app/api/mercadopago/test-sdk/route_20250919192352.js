import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export async function GET() {
  try {
    console.log('=== TESTING MERCADO PAGO SDK ===');
    
    const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
    console.log('ACCESS_TOKEN:', MERCADOPAGO_ACCESS_TOKEN ? 'CONFIGURADO' : 'NO CONFIGURADO');
    
    if (!MERCADOPAGO_ACCESS_TOKEN) {
      return NextResponse.json({ error: 'ACCESS_TOKEN no configurado' }, { status: 500 });
    }

    // Configurar Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: MERCADOPAGO_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    const preferenceData = {
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
      auto_return: 'approved',
    };

    console.log('Creating preference with data:', preferenceData);

    const result = await preference.create({ body: preferenceData });
    
    console.log('Mercado Pago response:', result);
    
    return NextResponse.json({ 
      message: 'SDK funcionando correctamente',
      result: result
    });

  } catch (error) {
    console.error('Error testing SDK:', error);
    return NextResponse.json({ 
      error: `Error al probar SDK: ${error.message}`,
      stack: error.stack
    }, { status: 500 });
  }
}
