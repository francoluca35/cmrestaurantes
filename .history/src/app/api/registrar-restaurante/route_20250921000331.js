import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export async function POST(request) {
  try {
    const data = await request.json();
    
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
      'conFinanzas'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Campo requerido faltante: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Verificar si el código de activación ya existe
    const codigoQuery = query(
      collection(db, 'restaurants'),
      where('codigoActivacion', '==', data.codigoActivacion)
    );
    const codigoSnapshot = await getDocs(codigoQuery);
    
    if (!codigoSnapshot.empty) {
      return NextResponse.json(
        { error: 'El código de activación ya está en uso' },
        { status: 400 }
      );
    }
    
    // Verificar si el email ya está registrado
    const emailQuery = query(
      collection(db, 'restaurants'),
      where('email', '==', data.email)
    );
    const emailSnapshot = await getDocs(emailQuery);
    
    if (!emailSnapshot.empty) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }
    
    // Crear documento del restaurante
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
      periodicidad: data.periodicidad, // 'mensual' o 'anual'
      cantUsuarios: parseInt(data.cantidadDispositivos) || 1,
      finanzas: data.conFinanzas === 'si',
      
      // Estado del restaurante
      activado: false,
      fechaRegistro: new Date(),
      fechaActivacion: null,
      
      // Configuración de pago
      plan: data.plan || data.periodicidad,
      precioBase: data.precioBase || (data.periodicidad === 'anual' ? 420 : 42),
      precioTotal: data.precioTotal || data.precioBase,
      moneda: data.moneda || 'usd',
      
      // Configuración adicional
      logoUrl: data.logoUrl || '',
      password: data.password || '',
      
      // Metadatos
      timestamp: new Date(),
      version: '1.0'
    };
    
    // Guardar en Firestore
    const docRef = await addDoc(collection(db, 'restaurants'), restaurantData);
    
    return NextResponse.json({
      success: true,
      message: 'Restaurante registrado exitosamente',
      restaurantId: docRef.id,
      codigoActivacion: data.codigoActivacion
    });
    
  } catch (error) {
    console.error('Error registrando restaurante:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
