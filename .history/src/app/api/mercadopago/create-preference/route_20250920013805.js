import { NextResponse } from 'next/server';

// Configuración de Mercado Pago desde variables de entorno
const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
const MERCADOPAGO_PUBLIC_KEY = process.env.MERCADOPAGO_PUBLIC_KEY;

export async function POST(request) {
  try {
    console.log('=== INICIO API MERCADO PAGO ===');
    console.log('MERCADOPAGO_ACCESS_TOKEN:', MERCADOPAGO_ACCESS_TOKEN ? 'CONFIGURADO' : 'NO CONFIGURADO');
    console.log('MERCADOPAGO_PUBLIC_KEY:', MERCADOPAGO_PUBLIC_KEY ? 'CONFIGURADO' : 'NO CONFIGURADO');
    
    // Verificar que las variables de entorno estén configuradas
    if (!MERCADOPAGO_ACCESS_TOKEN || !MERCADOPAGO_PUBLIC_KEY) {
      console.error('Mercado Pago credentials not configured');
      return NextResponse.json({ error: 'Configuración de Mercado Pago no encontrada' }, { status: 500 });
    }

    const { total, moneda, plan, datosRestaurante, tipoTarjeta, cuotas } = await request.json();
    
    console.log('Datos recibidos en API:', {
      total,
      moneda,
      plan,
      datosRestaurante,
      tipoTarjeta,
      cuotas
    });
    
    // Verificar límites de Mercado Pago
    const limiteMP = 500000; // Límite máximo por transacción
    const monto = parseFloat(total);
    
    console.log('Monto calculado:', monto);
    
    if (isNaN(monto) || monto <= 0) {
      throw new Error('Monto inválido');
    }
    
    if (monto > limiteMP && moneda === 'ars') {
      // Crear pago dividido para montos altos
      return await crearPagoDividido(monto, plan, datosRestaurante, tipoTarjeta, cuotas);
    } else {
      // Crear pago normal
      return await crearPagoNormal(monto, moneda, plan, datosRestaurante, tipoTarjeta, cuotas);
    }
  } catch (error) {
    console.error('=== ERROR EN API MERCADO PAGO ===');
    console.error('Error creating Mercado Pago preference:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ error: 'Error al crear la preferencia de pago' }, { status: 500 });
  }
}

async function crearPagoNormal(monto, moneda, plan, datosRestaurante, tipoTarjeta, cuotas) {
  try {
    const preferenceData = {
      items: [
        {
          title: `Plan ${plan || 'anual'} - Quick Solution`,
          quantity: 1,
          unit_price: monto,
          currency_id: moneda === 'ars' ? 'ARS' : 'USD',
        }
      ],
      payer: {
        name: datosRestaurante.nombrePropietario || 'Cliente',
        email: datosRestaurante.email || 'cliente@ejemplo.com',
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/resumen?status=success`,
        failure: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/resumen?status=error`,
        pending: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/resumen?status=pending`,
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: tipoTarjeta === 'debito' ? [{ id: 'credit_card' }] : [],
        installments: cuotas || 1,
      },
      notification_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/mercadopago/webhook`,
    };

    console.log('Preferencia enviada a Mercado Pago:', JSON.stringify(preferenceData, null, 2));

    const response = await fetch('https://api.mercadopago.com/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceData),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error(`Mercado Pago API error: ${response.status} - ${errorData.message || 'Error desconocido'}`);
    }

    const result = await response.json();
    console.log('Mercado Pago response:', result);
    
    return NextResponse.json({ 
      tipo: 'normal',
      preferenceId: result.id,
      initPoint: result.init_point 
    });
  } catch (error) {
    console.error('Error creating preference with fetch:', error);
    throw error;
  }
}

async function crearPagoDividido(monto, plan, datosRestaurante, tipoTarjeta, cuotas) {
  const limiteMP = 500000;
  const primeraParte = limiteMP;
  const segundaParte = monto - limiteMP;
  
  const preferencias = [];
  
  // Crear primera preferencia
  const pref1 = await crearPreferencia(
    primeraParte, 
    `Plan ${plan} - Pago 1/2`, 
    datosRestaurante, 
    tipoTarjeta, 
    cuotas
  );
  preferencias.push(pref1);
  
  // Crear segunda preferencia
  const pref2 = await crearPreferencia(
    segundaParte, 
    `Plan ${plan} - Pago 2/2`, 
    datosRestaurante, 
    tipoTarjeta, 
    cuotas
  );
  preferencias.push(pref2);
  
  return NextResponse.json({ 
    tipo: 'dividido',
    preferencias: preferencias.map(p => ({
      id: p.id,
      initPoint: p.init_point,
      title: p.items[0].title,
      amount: p.items[0].unit_price
    }))
  });
}

async function crearPreferencia(monto, titulo, datosRestaurante, tipoTarjeta, cuotas) {
  try {
    const preferenceData = {
      items: [
        {
          title: titulo,
          quantity: 1,
          unit_price: monto,
          currency_id: 'ARS',
        }
      ],
      payer: {
        name: datosRestaurante.nombrePropietario || 'Cliente',
        email: datosRestaurante.email || 'cliente@ejemplo.com',
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/resumen?status=success`,
        failure: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/resumen?status=error`,
        pending: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/resumen?status=pending`,
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: tipoTarjeta === 'debito' ? [{ id: 'credit_card' }] : [],
        installments: cuotas || 1,
      },
      notification_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/mercadopago/webhook`,
    };

    const response = await fetch('https://api.mercadopago.com/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Mercado Pago API error: ${response.status} - ${errorData.message || 'Error desconocido'}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating preference:', error);
    throw error;
  }
}