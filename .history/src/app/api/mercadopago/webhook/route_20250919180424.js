import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Verificar que sea una notificación de Mercado Pago
    if (body.type === 'payment') {
      const paymentId = body.data.id;
      
      // Aquí puedes procesar el pago
      console.log('Payment notification received:', paymentId);
      
      // Opcional: Verificar el estado del pago
      // const payment = await verificarPago(paymentId);
      
      // Opcional: Actualizar base de datos
      // await actualizarEstadoPago(paymentId, payment.status);
    }
    
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}

// Función para verificar el estado del pago
async function verificarPago(paymentId) {
  const MERCADOPAGO_ACCESS_TOKEN = 'APP_USR-3805637089394876-082020-0be9aa0136b8ed7239786d25df85999c-740803134';
  
  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Error verifying payment: ${response.status}`);
  }
  
  return await response.json();
}
