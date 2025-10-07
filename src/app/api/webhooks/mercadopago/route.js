import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

export async function POST(request) {
  try {
    const data = await request.json();
    
    console.log('Webhook MercadoPago recibido:', data);
    
    if (data.type === 'payment') {
      const paymentId = data.data.id;
      
      // Aquí deberías hacer una llamada a la API de MercadoPago para obtener los detalles del pago
      // Por simplicidad, asumimos que el pago fue aprobado
      
      const paymentData = {
        paymentId: paymentId,
        status: 'approved',
        metodoPago: 'mercadopago',
        fechaPago: new Date(),
        datosWebhook: data,
        timestamp: new Date()
      };
      
      // Guardar pago en Firestore
      await addDoc(collection(db, 'payments'), paymentData);
      
      // Buscar y activar restaurante si existe
      if (data.external_reference) {
        const q = query(
          collection(db, 'restaurants'),
          where('codigoActivacion', '==', data.external_reference)
        );
        
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const restaurantDoc = querySnapshot.docs[0];
          const restaurantRef = doc(db, 'restaurants', restaurantDoc.id);
          
          await updateDoc(restaurantRef, {
            activado: true,
            fechaActivacion: new Date(),
            status: 'active',
            ultimoPago: paymentId
          });
        }
      }
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error procesando webhook:', error);
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    );
  }
}
