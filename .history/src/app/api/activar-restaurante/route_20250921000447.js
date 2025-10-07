import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { query, where, getDocs, doc, updateDoc, collection } from 'firebase/firestore';

export async function POST(request) {
  try {
    const { codigoActivacion, password } = await request.json();
    
    if (!codigoActivacion) {
      return NextResponse.json(
        { error: 'Código de activación requerido' },
        { status: 400 }
      );
    }
    
    // Buscar restaurante por código de activación
    const q = query(
      collection(db, 'restaurants'),
      where('codigoActivacion', '==', codigoActivacion)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: 'Código de activación no válido' },
        { status: 404 }
      );
    }
    
    const restaurantDoc = querySnapshot.docs[0];
    const restaurantData = restaurantDoc.data();
    
    // Verificar si ya está activado
    if (restaurantData.activado) {
      return NextResponse.json({
        success: true,
        message: 'Restaurante ya está activado',
        restaurant: {
          id: restaurantDoc.id,
          nombre: restaurantData.nombre,
          activado: true,
          fechaActivacion: restaurantData.fechaActivacion
        }
      });
    }
    
    // Verificar contraseña si se proporciona
    if (password && restaurantData.password && password !== restaurantData.password) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }
    
    // Activar restaurante
    const restaurantRef = doc(db, 'restaurants', restaurantDoc.id);
    await updateDoc(restaurantRef, {
      activado: true,
      fechaActivacion: new Date(),
      status: 'active'
    });
    
    return NextResponse.json({
      success: true,
      message: 'Restaurante activado exitosamente',
      restaurant: {
        id: restaurantDoc.id,
        nombre: restaurantData.nombre,
        propietario: restaurantData.propietario,
        email: restaurantData.email,
        activado: true,
        fechaActivacion: new Date(),
        periodicidad: restaurantData.periodicidad,
        cantUsuarios: restaurantData.cantUsuarios,
        finanzas: restaurantData.finanzas
      }
    });
    
  } catch (error) {
    console.error('Error activando restaurante:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
