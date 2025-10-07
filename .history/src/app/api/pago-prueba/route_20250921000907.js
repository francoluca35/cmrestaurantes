import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';

export async function POST(request) {
  try {
    const data = await request.json();
    
    console.log('=== INICIO PAGO DE PRUEBA ===');
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
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Campo requerido faltante: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // 1. Registrar restaurante en la base de datos
    const restaurantData = {
      // Información básica
      nombre: data.nombreRestaurante,
      propietario: data.nombrePropietario,
      email: data.email,
      telefono: data.telefono,
      direccion: data.direccion,
      dni: data.dniPropietario || '',
      
      // Configuración del servicio
      codigoActivacion: data.codigoActivacion,
      periodicidad: data.periodicidad,
      cantUsuarios: parseInt(data.cantidadDispositivos) || 1,
      finanzas: data.conFinanzas === 'si',
      
      // Estado del restaurante
      activado: false,
      fechaRegistro: new Date(),
      fechaActivacion: null,
      
      // Configuración de pago
      plan: data.periodicidad,
      precioBase: data.precioBase || (data.periodicidad === 'anual' ? 420 : 42),
      precioTotal: parseFloat(data.total),
      moneda: data.moneda,
      
      // Configuración adicional
      logoUrl: data.logoUrl || '',
      password: data.password || '',
      
      // Metadatos
      timestamp: new Date(),
      version: '1.0',
      metodoRegistro: 'pago_prueba'
    };
    
    console.log('Registrando restaurante:', restaurantData);
    const restaurantRef = await addDoc(collection(db, 'restaurants'), restaurantData);
    console.log('Restaurante registrado con ID:', restaurantRef.id);
    
    // 2. Crear registro de pago de prueba
    const paymentData = {
      restaurantId: restaurantRef.id,
      metodoPago: 'pago_prueba',
      monto: parseFloat(data.total),
      moneda: data.moneda,
      transactionId: `TEST_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'approved',
      fechaPago: new Date(),
      datosAdicionales: {
        tipo: 'pago_prueba',
        datosRestaurante: data,
        timestamp: new Date()
      },
      timestamp: new Date()
    };
    
    console.log('Registrando pago de prueba:', paymentData);
    const paymentRef = await addDoc(collection(db, 'payments'), paymentData);
    console.log('Pago registrado con ID:', paymentRef.id);
    
    // 3. Activar restaurante
    console.log('Activando restaurante...');
    await updateDoc(doc(db, 'restaurants', restaurantRef.id), {
      activado: true,
      fechaActivacion: new Date(),
      ultimoPago: paymentRef.id,
      status: 'active',
      metodoActivacion: 'pago_prueba'
    });
    
    console.log('=== PAGO DE PRUEBA COMPLETADO ===');
    
    return NextResponse.json({
      success: true,
      message: 'Pago de prueba procesado exitosamente',
      restaurantId: restaurantRef.id,
      paymentId: paymentRef.id,
      codigoActivacion: data.codigoActivacion,
      transactionId: paymentData.transactionId,
      datos: {
        restaurante: restaurantData,
        pago: paymentData
      }
    });
    
  } catch (error) {
    console.error('=== ERROR EN PAGO DE PRUEBA ===');
    console.error('Error:', error);
    return NextResponse.json(
      { 
        error: 'Error en pago de prueba',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
