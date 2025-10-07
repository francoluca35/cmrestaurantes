import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { query, where, getDocs, collection } from 'firebase/firestore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const codigoActivacion = searchParams.get('codigo');
    
    if (!codigoActivacion) {
      return NextResponse.json(
        { error: 'Código de activación requerido' },
        { status: 400 }
      );
    }
    
    // Buscar restaurante
    const q = query(
      collection(db, 'restaurants'),
      where('codigoActivacion', '==', codigoActivacion)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: 'Restaurante no encontrado' },
        { status: 404 }
      );
    }
    
    const restaurantDoc = querySnapshot.docs[0];
    const restaurantData = restaurantDoc.data();
    
    return NextResponse.json({
      success: true,
      restaurant: {
        id: restaurantDoc.id,
        nombre: restaurantData.nombre,
        propietario: restaurantData.propietario,
        email: restaurantData.email,
        activado: restaurantData.activado,
        fechaActivacion: restaurantData.fechaActivacion,
        periodicidad: restaurantData.periodicidad,
        cantUsuarios: restaurantData.cantUsuarios,
        finanzas: restaurantData.finanzas,
        status: restaurantData.status
      }
    });
    
  } catch (error) {
    console.error('Error verificando estado:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
