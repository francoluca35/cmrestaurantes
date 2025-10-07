import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('=== PAGO DE PRUEBA DEBUG ===');
    
    const data = await request.json();
    console.log('Datos recibidos:', data);
    
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const restaurantId = `REST-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const paymentId = `PAY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const codigoActivacion = data.codigoActivacion || `CODE-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    console.log('Pago de prueba procesado exitosamente');
    console.log('Restaurant ID:', restaurantId);
    console.log('Payment ID:', paymentId);
    console.log('Código Activación:', codigoActivacion);
    
    return NextResponse.json({
      success: true,
      message: 'Pago de prueba debug procesado',
      restaurantId,
      paymentId,
      codigoActivacion,
      datosRecibidos: data,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('=== ERROR EN PAGO DE PRUEBA DEBUG ===');
    console.error('Error:', error);
    console.error('Error message:', error.message);
    
    return NextResponse.json({
      success: false,
      error: 'Error en pago de prueba debug',
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
