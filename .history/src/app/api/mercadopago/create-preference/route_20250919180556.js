import { NextResponse } from 'next/server';

// Configuración de Mercado Pago
const MERCADOPAGO_ACCESS_TOKEN = 'APP_USR-3805637089394876-082020-0be9aa0136b8ed7239786d25df85999c-740803134';
const MERCADOPAGO_PUBLIC_KEY = 'APP_USR-ceea8366-0dc0-4ef5-921c-14f92014a596';

export async function POST(request) {
  try {
    const { total, moneda, plan, datosRestaurante, tipoTarjeta, cuotas } = await request.json();
    
    // Verificar límites de Mercado Pago
    const limiteMP = 500000; // Límite máximo por transacción
    const monto = parseFloat(total);
    
    if (monto > limiteMP && moneda === 'ars') {
      // Crear pago dividido para montos altos
      return await crearPagoDividido(monto, plan, datosRestaurante, tipoTarjeta, cuotas);
    } else {
      // Crear pago normal
      return await crearPagoNormal(monto, moneda, plan, datosRestaurante, tipoTarjeta, cuotas);
    }
  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error);
    return NextResponse.json({ error: 'Error al crear la preferencia de pago' }, { status: 500 });
  }
}

async function crearPagoNormal(monto, moneda, plan, datosRestaurante, tipoTarjeta, cuotas) {
  const preference = {
    items: [
      {
        title: `Plan ${plan} - Quick Solution`,
        quantity: 1,
        unit_price: monto,
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
      excluded_payment_types: tipoTarjeta === 'debito' ? [{ id: 'credit_card' }] : [],
      installments: cuotas || 1,
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
    tipo: 'normal',
    preferenceId: data.id,
    initPoint: data.init_point 
  });
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
  const preference = {
    items: [
      {
        title: titulo,
        quantity: 1,
        unit_price: monto,
        currency_id: 'ARS',
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
      excluded_payment_types: tipoTarjeta === 'debito' ? [{ id: 'credit_card' }] : [],
      installments: cuotas || 1,
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

  return await response.json();
}
