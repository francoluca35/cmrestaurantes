import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validar datos requeridos
    const requiredFields = [
      'restaurantId',
      'metodoPago',
      'monto',
      'moneda',
      'transactionId'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Campo requerido faltante: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Crear registro de pago
    const paymentData = {
      restaurantId: data.restaurantId,
      metodoPago: data.metodoPago,
      monto: parseFloat(data.monto),
      moneda: data.moneda,
      transactionId: data.transactionId,
      status: 'approved', // o 'pending' según el método
      fechaPago: new Date(),
      datosAdicionales: data.datosAdicionales || {},
      timestamp: new Date()
    };
    
    // Guardar pago en Firestore
    const paymentRef = await addDoc(collection(db, 'payments'), paymentData);
    
    // Actualizar estado del restaurante
    const restaurantRef = doc(db, 'restaurants', data.restaurantId);
    await updateDoc(restaurantRef, {
      activado: true,
      fechaActivacion: new Date(),
      ultimoPago: paymentRef.id,
      status: 'active'
    });
    
    return NextResponse.json({
      success: true,
      message: 'Pago procesado y restaurante activado',
      paymentId: paymentRef.id,
      restaurantId: data.restaurantId
    });
    
  } catch (error) {
    console.error('Error procesando pago:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
