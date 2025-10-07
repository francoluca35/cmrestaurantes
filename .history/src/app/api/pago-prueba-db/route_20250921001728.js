import { NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const RESTAURANTS_FILE = path.join(DATA_DIR, 'restaurants.json');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');

export async function POST(request) {
  try {
    const data = await request.json();
    
    console.log('=== PAGO DE PRUEBA CON BASE DE DATOS LOCAL ===');
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
    
    // Crear directorio de datos si no existe
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true });
      console.log('Directorio de datos creado:', DATA_DIR);
    }
    
    // Leer restaurantes existentes
    let restaurants = [];
    if (existsSync(RESTAURANTS_FILE)) {
      try {
        const restaurantsData = await readFile(RESTAURANTS_FILE, 'utf-8');
        restaurants = JSON.parse(restaurantsData);
      } catch (error) {
        console.log('Error leyendo restaurantes, creando array vacío');
        restaurants = [];
      }
    }
    
    // Leer pagos existentes
    let payments = [];
    if (existsSync(PAYMENTS_FILE)) {
      try {
        const paymentsData = await readFile(PAYMENTS_FILE, 'utf-8');
        payments = JSON.parse(paymentsData);
      } catch (error) {
        console.log('Error leyendo pagos, creando array vacío');
        payments = [];
      }
    }
    
    // Crear ID único para el restaurante
    const restaurantId = `REST_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Crear datos del restaurante
    const restaurantData = {
      id: restaurantId,
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
      activado: true,
      fechaRegistro: new Date().toISOString(),
      fechaActivacion: new Date().toISOString(),
      
      // Configuración de pago
      plan: data.periodicidad,
      precioBase: data.precioBase || (data.periodicidad === 'anual' ? 420 : 42),
      precioTotal: parseFloat(data.total),
      moneda: data.moneda,
      
      // Configuración adicional
      logoUrl: data.logoUrl || '',
      password: data.password || '',
      
      // Metadatos
      timestamp: new Date().toISOString(),
      version: '1.0',
      metodoRegistro: 'pago_prueba'
    };
    
    // Crear datos del pago
    const paymentData = {
      id: paymentId,
      restaurantId: restaurantId,
      metodoPago: 'pago_prueba',
      monto: parseFloat(data.total),
      moneda: data.moneda,
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
    
    // Agregar a los arrays
    restaurants.push(restaurantData);
    payments.push(paymentData);
    
    // Guardar restaurantes
    await writeFile(RESTAURANTS_FILE, JSON.stringify(restaurants, null, 2));
    console.log('Restaurante guardado en:', RESTAURANTS_FILE);
    
    // Guardar pagos
    await writeFile(PAYMENTS_FILE, JSON.stringify(payments, null, 2));
    console.log('Pago guardado en:', PAYMENTS_FILE);
    
    console.log('=== DATOS GUARDADOS EXITOSAMENTE ===');
    console.log('Restaurante ID:', restaurantId);
    console.log('Pago ID:', paymentId);
    
    return NextResponse.json({
      success: true,
      message: 'Pago de prueba procesado y datos guardados exitosamente',
      restaurantId: restaurantId,
      paymentId: paymentId,
      codigoActivacion: data.codigoActivacion,
      transactionId: paymentData.transactionId,
      archivosGuardados: [
        RESTAURANTS_FILE,
        PAYMENTS_FILE
      ],
      datos: {
        restaurante: restaurantData,
        pago: paymentData
      }
    });
    
  } catch (error) {
    console.error('=== ERROR EN PAGO DE PRUEBA CON DB ===');
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error en pago de prueba con base de datos',
      details: error.message
    }, { status: 500 });
  }
}
