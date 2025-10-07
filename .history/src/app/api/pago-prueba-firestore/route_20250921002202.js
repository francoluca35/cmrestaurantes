import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export async function POST(request) {
  try {
    const data = await request.json();
    
    console.log('=== PAGO DE PRUEBA CON FIRESTORE ===');
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
    
    // Verificar si el código de activación ya existe
    const codigoQuery = query(
      collection(db, 'restaurantes'),
      where('codigoActivacion', '==', data.codigoActivacion)
    );
    const codigoSnapshot = await getDocs(codigoQuery);
    
    if (!codigoSnapshot.empty) {
      return NextResponse.json({
        success: false,
        error: 'El código de activación ya está en uso'
      }, { status: 400 });
    }
    
    // Crear documento del restaurante con la estructura exacta que necesitas
    const restaurantData = {
      // Información básica
      nombre: data.nombreRestaurante,
      email: data.email,
      telefono: data.telefono,
      direccion: data.direccion,
      
      // Configuración del servicio
      codigoActivacion: data.codigoActivacion,
      periodicidad: data.periodicidad,
      cantidadUsuarios: parseInt(data.cantidadDispositivos) || 2,
      conFinanzas: data.conFinanzas === 'si',
      tipoServicio: data.conFinanzas === 'si' ? 'conFinanzas' : 'sinFinanzas',
      
      // Estado del restaurante
      estado: 'activo',
      fechaActivacion: new Date().toISOString(),
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
      
      // Configuración de pago
      precio: parseFloat(data.total),
      moneda: data.moneda.toUpperCase(),
      formaPago: 'pago_prueba',
      estadoPago: 'pagado',
      fechaPago: new Date().toISOString(),
      
      // Configuración de cuotas
      cuotasPagadas: 1,
      cuotasTotales: 1,
      proximoPago: data.periodicidad === 'anual' ? 
        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : 
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      
      // Métricas
      ingresosMensuales: 0,
      
      // Metadatos
      timestamp: new Date().toISOString(),
      version: '1.0',
      metodoRegistro: 'pago_prueba'
    };
    
    console.log('Guardando restaurante en Firestore:', restaurantData);
    
    // Guardar en Firestore en la colección 'restaurantes'
    const docRef = await addDoc(collection(db, 'restaurantes'), restaurantData);
    console.log('Restaurante guardado con ID:', docRef.id);
    
    // Crear registro de pago en la colección 'pagos'
    const paymentData = {
      restaurantId: docRef.id,
      codigoActivacion: data.codigoActivacion,
      metodoPago: 'pago_prueba',
      monto: parseFloat(data.total),
      moneda: data.moneda.toUpperCase(),
      transactionId: `TEST_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'approved',
      fechaPago: new Date().toISOString(),
      datosAdicionales: {
        tipo: 'pago_prueba',
        datosRestaurante: data,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    };
    
    console.log('Guardando pago en Firestore:', paymentData);
    const paymentRef = await addDoc(collection(db, 'pagos'), paymentData);
    console.log('Pago guardado con ID:', paymentRef.id);
    
    console.log('=== DATOS GUARDADOS EXITOSAMENTE EN FIRESTORE ===');
    console.log('Restaurante ID:', docRef.id);
    console.log('Pago ID:', paymentRef.id);
    
    return NextResponse.json({
      success: true,
      message: 'Pago de prueba procesado y datos guardados en Firestore exitosamente',
      restaurantId: docRef.id,
      paymentId: paymentRef.id,
      codigoActivacion: data.codigoActivacion,
      transactionId: paymentData.transactionId,
      colecciones: {
        restaurantes: 'restaurantes',
        pagos: 'pagos'
      },
      datos: {
        restaurante: restaurantData,
        pago: paymentData
      }
    });
    
  } catch (error) {
    console.error('=== ERROR EN PAGO DE PRUEBA CON FIRESTORE ===');
    console.error('Error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    return NextResponse.json({
      success: false,
      error: 'Error en pago de prueba con Firestore',
      details: error.message,
      code: error.code
    }, { status: 500 });
  }
}
