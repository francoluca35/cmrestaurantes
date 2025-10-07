import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    
    console.log('=== PAGO DE PRUEBA SIMPLE ===');
    console.log('Datos recibidos:', data);
    
    // Validar datos requeridos
    const requiredFields = [
      'nombreRestaurante',
      'nombrePropietario', 
      'email',
      'telefono',
      'direccion',
      'codigoActivacion',
      'periodicidad',
      'cantidadDispositivos',
      'conFinanzas',
      'total',
      'moneda'
    ];
    
    const missingFields = [];
    for (const field of requiredFields) {
      if (!data[field]) {
        missingFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Campos faltantes: ${missingFields.join(', ')}`,
        missingFields: missingFields
      }, { status: 400 });
    }
    
    // Simular procesamiento exitoso
    const restaurantId = `REST_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log('Simulando registro exitoso...');
    console.log('Restaurant ID:', restaurantId);
    console.log('Payment ID:', paymentId);
    
    return NextResponse.json({
      success: true,
      message: 'Pago de prueba procesado exitosamente (SIMULADO)',
      restaurantId: restaurantId,
      paymentId: paymentId,
      codigoActivacion: data.codigoActivacion,
      transactionId: `TEST_${Date.now()}`,
      datos: {
        restaurante: {
          nombre: data.nombreRestaurante,
          propietario: data.nombrePropietario,
          email: data.email,
          activado: true
        },
        pago: {
          monto: data.total,
          moneda: data.moneda,
          status: 'approved'
        }
      }
    });
    
  } catch (error) {
    console.error('=== ERROR EN PAGO DE PRUEBA SIMPLE ===');
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error en pago de prueba simple',
      details: error.message
    }, { status: 500 });
  }
}
