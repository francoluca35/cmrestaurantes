import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export async function GET() {
  try {
    console.log('=== VERIFICANDO DATOS EN FIRESTORE ===');
    
    const result = {
      success: true,
      data: {
        restaurants: [],
        codigosactivacion: [],
        payments: []
      }
    };
    
    // Leer restaurantes
    try {
      const restaurantsQuery = query(
        collection(db, 'restaurantes'),
        orderBy('fechaCreacion', 'desc'),
        limit(10)
      );
      const restaurantsSnapshot = await getDocs(restaurantsQuery);
      
      restaurantsSnapshot.forEach((doc) => {
        result.data.restaurants.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      console.log('Restaurantes encontrados:', result.data.restaurants.length);
    } catch (error) {
      console.error('Error leyendo restaurantes:', error);
      result.data.restaurants = [];
    }
    
    // Leer códigos de activación
    try {
      const codigosQuery = query(
        collection(db, 'codigosactivacion'),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
      const codigosSnapshot = await getDocs(codigosQuery);
      
      codigosSnapshot.forEach((doc) => {
        result.data.codigosactivacion.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      console.log('Códigos de activación encontrados:', result.data.codigosactivacion.length);
    } catch (error) {
      console.error('Error leyendo códigos de activación:', error);
      result.data.codigosactivacion = [];
    }
    
    // Leer pagos
    try {
      const paymentsQuery = query(
        collection(db, 'pagos'),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
      const paymentsSnapshot = await getDocs(paymentsQuery);
      
      paymentsSnapshot.forEach((doc) => {
        result.data.payments.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      console.log('Pagos encontrados:', result.data.payments.length);
    } catch (error) {
      console.error('Error leyendo pagos:', error);
      result.data.payments = [];
    }
    
    console.log('=== RESULTADO FIRESTORE ===');
    console.log('Total restaurantes:', result.data.restaurants.length);
    console.log('Total pagos:', result.data.payments.length);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('=== ERROR VERIFICANDO FIRESTORE ===');
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error verificando Firestore',
      details: error.message
    }, { status: 500 });
  }
}
