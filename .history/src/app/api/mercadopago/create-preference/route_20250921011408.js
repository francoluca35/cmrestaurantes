import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';

// Configuración de Mercado Pago desde variables de entorno
const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
const MERCADOPAGO_PUBLIC_KEY = process.env.MERCADOPAGO_PUBLIC_KEY;

export async function POST(request) {
  try {
    console.log('=== INICIO API MERCADO PAGO ===');
    console.log('MERCADOPAGO_ACCESS_TOKEN:', MERCADOPAGO_ACCESS_TOKEN ? 'CONFIGURADO' : 'NO CONFIGURADO');
    console.log('MERCADOPAGO_PUBLIC_KEY:', MERCADOPAGO_PUBLIC_KEY ? 'CONFIGURADO' : 'NO CONFIGURADO');
    
    // Verificar que las variables de entorno estén configuradas
    if (!MERCADOPAGO_ACCESS_TOKEN || !MERCADOPAGO_PUBLIC_KEY) {
      console.error('Mercado Pago credentials not configured');
      return NextResponse.json({ error: 'Configuración de Mercado Pago no encontrada' }, { status: 500 });
    }

    const { total, moneda, plan, datosRestaurante, tipoTarjeta, cuotas, esPagoPrueba } = await request.json();
    
    console.log('Datos recibidos en API:', {
      total,
      moneda,
      plan,
      datosRestaurante,
      tipoTarjeta,
      cuotas,
      esPagoPrueba
    });
    
    // Verificar límites de Mercado Pago
    const limiteMP = 1000000; // Límite máximo por transacción (aumentado)
    
    // Si es pago de prueba, usar monto fijo muy pequeño
    let monto;
    let monedaPago;
    if (esPagoPrueba) {
      monto = 0.2; // 0.2 centavos ARS para prueba
      monedaPago = 'ARS'; // Forzar ARS para pago de prueba
      console.log('🔧 PAGO DE PRUEBA DETECTADO - Usando monto fijo: 0.2 centavos ARS');
    } else {
      monto = parseFloat(total);
      monedaPago = moneda;
    }
    
    console.log('Monto calculado:', monto);
    
    if (isNaN(monto) || monto <= 0) {
      throw new Error('Monto inválido');
    }
    
    // Crear pago normal (sin división)
    return await crearPagoNormal(monto, monedaPago, plan, datosRestaurante, tipoTarjeta, cuotas, esPagoPrueba);
  } catch (error) {
    console.error('=== ERROR EN API MERCADO PAGO ===');
    console.error('Error creating Mercado Pago preference:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ error: 'Error al crear la preferencia de pago' }, { status: 500 });
  }
}

async function crearPagoNormal(monto, moneda, plan, datosRestaurante, tipoTarjeta, cuotas, esPagoPrueba = false) {
  try {
    const preferenceData = {
      items: [
        {
          title: esPagoPrueba ? `PRUEBA - Plan ${plan || 'anual'} - Quick Solution` : `Plan ${plan || 'anual'} - Quick Solution`,
          quantity: 1,
          unit_price: monto,
          currency_id: moneda === 'ars' ? 'ARS' : 'USD',
        }
      ],
      payer: {
        name: datosRestaurante.nombrePropietario || 'Cliente',
        email: datosRestaurante.email || 'cliente@ejemplo.com',
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/resumen?status=success`,
        failure: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/resumen?status=error`,
        pending: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/resumen?status=pending`,
      },
      payment_methods: {
        excluded_payment_types: [],
        excluded_payment_methods: [],
        installments: cuotas || 1,
        default_installments: 1,
      },
      notification_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/mercadopago/webhook`,
      processing_modes: ['aggregator'],
    };

    console.log('Preferencia enviada a Mercado Pago:', JSON.stringify(preferenceData, null, 2));

    // Registrar restaurante en la base de datos antes de crear la preferencia
    let restaurantId = null;
    try {
      const restaurantData = {
        // Información básica
        nombre: datosRestaurante.nombreRestaurante,
        email: datosRestaurante.email,
        telefono: datosRestaurante.telefono,
        direccion: datosRestaurante.direccion,
        
        // Configuración del servicio
        codigoActivacion: datosRestaurante.codigoActivacion,
        periodicidad: plan,
        cantidadUsuarios: parseInt(datosRestaurante.cantidadDispositivos) || 2,
        conFinanzas: datosRestaurante.conFinanzas === 'si',
        tipoServicio: datosRestaurante.conFinanzas === 'si' ? 'conFinanzas' : 'sinFinanzas',
        
        // Estado del restaurante
        estado: 'activo',
        fechaActivacion: new Date().toISOString(),
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
        
        // Configuración de pago
        precio: parseFloat(total),
        moneda: moneda.toUpperCase(),
        formaPago: 'mercadopago',
        estadoPago: 'pendiente',
        fechaPago: null,
        
        // Configuración de cuotas
        cuotasPagadas: 0,
        cuotasTotales: 1,
        proximoPago: plan === 'anual' ? 
          new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : 
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        
        // Métricas
        ingresosMensuales: 0,
        
        // Metadatos
        timestamp: new Date().toISOString(),
        version: '1.0',
        metodoRegistro: 'mercadopago'
      };
      
      const docRef = doc(db, 'restaurants', datosRestaurante.codigoActivacion);
      await setDoc(docRef, restaurantData);
      restaurantId = datosRestaurante.codigoActivacion;
      console.log('Restaurante registrado con ID (código de activación):', restaurantId);
      
      // Crear código de activación en colección separada
      const codigoData = {
        resto: datosRestaurante.nombreRestaurante,
        codActivacion: datosRestaurante.codigoActivacion,
        email: datosRestaurante.email,
        cantUsuarios: parseInt(datosRestaurante.cantidadDispositivos) || 2,
        finanzas: datosRestaurante.conFinanzas === 'si',
        logo: '',
        password: datosRestaurante.password || '',
        timestamp: new Date().toISOString()
      };
      
      const codigoRef = doc(db, 'codigosactivacion', datosRestaurante.codigoActivacion);
      await setDoc(codigoRef, codigoData);
      console.log('Código de activación guardado con ID (código de activación):', datosRestaurante.codigoActivacion);
      
      // Crear subcolecciones con documentos específicos (misma lógica que pago-prueba)
      await crearSubcoleccionesRestaurante(datosRestaurante.codigoActivacion);
      
    } catch (error) {
      console.error('Error registrando restaurante:', error);
      // Continuar con la preferencia aunque falle el registro
    }

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceData),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error(`Mercado Pago API error: ${response.status} - ${errorData.message || 'Error desconocido'}`);
    }

    const result = await response.json();
    console.log('Mercado Pago response:', result);
    
    return NextResponse.json({ 
      tipo: 'normal',
      preferenceId: result.id,
      initPoint: result.init_point,
      restaurantId: restaurantId
    });
  } catch (error) {
    console.error('Error creating preference with fetch:', error);
    throw error;
  }
}

async function crearPagoDividido(monto, plan, datosRestaurante, tipoTarjeta, cuotas) {
  const limiteMP = 1000000;
  const primeraParte = limiteMP;
  const segundaParte = monto - limiteMP;
  
  const preferencias = [];
  
  // Crear primera preferencia
  const pref1 = await crearPreferencia(
    primeraParte, 
    `Plan ${plan} - Pago 1/2`, 
    datosRestaurante, 
    tipoTarjeta, 
    cuotas
  );
  preferencias.push(pref1);
  
  // Crear segunda preferencia
  const pref2 = await crearPreferencia(
    segundaParte, 
    `Plan ${plan} - Pago 2/2`, 
    datosRestaurante, 
    tipoTarjeta, 
    cuotas
  );
  preferencias.push(pref2);
  
  return NextResponse.json({ 
    tipo: 'dividido',
    preferencias: preferencias.map(p => ({
      id: p.id,
      initPoint: p.init_point,
      title: p.items[0].title,
      amount: p.items[0].unit_price
    }))
  });
}

async function crearPreferencia(monto, titulo, datosRestaurante, tipoTarjeta, cuotas) {
  try {
    const preferenceData = {
      items: [
        {
          title: titulo,
          quantity: 1,
          unit_price: monto,
          currency_id: 'ARS',
        }
      ],
      payer: {
        name: datosRestaurante.nombrePropietario || 'Cliente',
        email: datosRestaurante.email || 'cliente@ejemplo.com',
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/resumen?status=success`,
        failure: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/resumen?status=error`,
        pending: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pago/resumen?status=pending`,
      },
      payment_methods: {
        excluded_payment_types: [],
        excluded_payment_methods: [],
        installments: cuotas || 1,
        default_installments: 1,
      },
      notification_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/mercadopago/webhook`,
      processing_modes: ['aggregator'],
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Mercado Pago API error: ${response.status} - ${errorData.message || 'Error desconocido'}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating preference:', error);
    throw error;
  }
}

// Función para crear subcolecciones del restaurante (misma lógica que pago-prueba)
async function crearSubcoleccionesRestaurante(codigoActivacion) {
  const subcolecciones = [
    'CajaRegistradora', 'Dinero', 'Ingresos', 'Mpagos', 'ServiciosComercio',
    'SueldoEmpleados', 'bebidas', 'configuracion', 'mensajes', 'menus',
    'mesas', 'pedidosCocina', 'stock', 'tables', 'users', 'usuarios'
  ];

  const documentosEspecificos = {
    'CajaRegistradora': {
      'caja_principal': {
        Apertura: "0",
        Extraccion: {},
        Ingresos: {},
        estado: "activa",
        fechaActualizacion: "2025-08-21T07:13:38.258Z",
        fechaCreacion: "2025-08-21T07:13:38.258Z",
        nombre: "Caja Principal",
        saldo: 0,
        ultimaActualizacion: new Date().toISOString()
      }
    },
    'Dinero': {
      'dinero_actual': {
        fechaActualizacion: "2025-08-21T07:13:38.258Z",
        fechaCreacion: "2025-08-21T07:13:38.258Z",
        moneda: "ARS",
        monto: 0
      }
    },
    'Mpagos': {
      'configuracion': {
        accessToken: "",
        activo: false,
        fechaActualizacion: "2025-08-21T07:13:38.258Z",
        fechaCreacion: "2025-08-21T07:13:38.258Z",
        publicKey: ""
      }
    },
    'ServiciosComercio': {
      'servicios_basicos': {
        fechaCreacion: "2025-08-21T07:13:38.258Z",
        nombre: "Servicios Básicos",
        servicios: [
          { activo: true, nombre: "WiFi", precio: 0 },
          { activo: false, nombre: "Estacionamiento", precio: 0 },
          { activo: true, nombre: "Delivery", precio: 0 }
        ]
      }
    },
    'configuracion': {
      'notificaciones': {
        isEnabled: true,
        soundType: "sonido2",
        updatedAt: new Date().toISOString(),
        volume: 1
      }
    },
    'tables': {
      'mesa2': { cliente: "", estado: "libre", fechaCreacion: "2025-08-21T07:13:45.426Z", id: "mesa2", lugar: "adentro", numero: "02", pedidoFinalizado: true, pedidoId: "GYab4O8Kb0a83VIqUimQ", position: { x: 200, y: 44 }, productos: [], tamaño: "normal", total: 0, updatedAt: new Date().toISOString() },
      'mesa3': { cliente: "", estado: "libre", fechaCreacion: "2025-08-21T07:13:45.426Z", id: "mesa3", lugar: "adentro", numero: "03", pedidoFinalizado: true, pedidoId: "GYab4O8Kb0a83VIqUimQ", position: { x: 200, y: 44 }, productos: [], tamaño: "normal", total: 0, updatedAt: new Date().toISOString() },
      'mesa4': { cliente: "", estado: "libre", fechaCreacion: "2025-08-21T07:13:45.426Z", id: "mesa4", lugar: "adentro", numero: "04", pedidoFinalizado: true, pedidoId: "GYab4O8Kb0a83VIqUimQ", position: { x: 200, y: 44 }, productos: [], tamaño: "normal", total: 0, updatedAt: new Date().toISOString() },
      'mesa5': { cliente: "", estado: "libre", fechaCreacion: "2025-08-21T07:13:45.426Z", id: "mesa5", lugar: "adentro", numero: "05", pedidoFinalizado: true, pedidoId: "GYab4O8Kb0a83VIqUimQ", position: { x: 200, y: 44 }, productos: [], tamaño: "normal", total: 0, updatedAt: new Date().toISOString() },
      'mesa6': { cliente: "", estado: "libre", fechaCreacion: "2025-08-21T07:13:45.426Z", id: "mesa6", lugar: "adentro", numero: "06", pedidoFinalizado: true, pedidoId: "GYab4O8Kb0a83VIqUimQ", position: { x: 200, y: 44 }, productos: [], tamaño: "normal", total: 0, updatedAt: new Date().toISOString() },
      'mesa7': { cliente: "", estado: "libre", fechaCreacion: "2025-08-21T07:13:45.426Z", id: "mesa7", lugar: "adentro", numero: "07", pedidoFinalizado: true, pedidoId: "GYab4O8Kb0a83VIqUimQ", position: { x: 200, y: 44 }, productos: [], tamaño: "normal", total: 0, updatedAt: new Date().toISOString() },
      'mesa8': { cliente: "", estado: "libre", fechaCreacion: "2025-08-21T07:13:45.426Z", id: "mesa8", lugar: "adentro", numero: "08", pedidoFinalizado: true, pedidoId: "GYab4O8Kb0a83VIqUimQ", position: { x: 200, y: 44 }, productos: [], tamaño: "normal", total: 0, updatedAt: new Date().toISOString() },
      'mesa9': { cliente: "", estado: "libre", fechaCreacion: "2025-08-21T07:13:45.426Z", id: "mesa9", lugar: "adentro", numero: "09", pedidoFinalizado: true, pedidoId: "GYab4O8Kb0a83VIqUimQ", position: { x: 200, y: 44 }, productos: [], tamaño: "normal", total: 0, updatedAt: new Date().toISOString() }
    }
  };

  // Crear documentos específicos
  for (const [subcoleccion, documentos] of Object.entries(documentosEspecificos)) {
    try {
      console.log(`Creando documentos en subcolección '${subcoleccion}'...`);
      for (const [documentoId, documentoData] of Object.entries(documentos)) {
        const docRef = doc(db, 'restaurantes', codigoActivacion, subcoleccion, documentoId);
        await setDoc(docRef, documentoData);
        console.log(`✅ Documento '${documentoId}' creado en '${subcoleccion}'`);
      }
    } catch (error) {
      console.error(`❌ Error creando documentos en '${subcoleccion}':`, error);
    }
  }

  // Crear subcolecciones restantes con documentos básicos
  const subcoleccionesRestantes = subcolecciones.filter(sc => !documentosEspecificos[sc]);
  for (const subcoleccion of subcoleccionesRestantes) {
    try {
      const subcoleccionRef = collection(db, 'restaurantes', codigoActivacion, subcoleccion);
      await addDoc(subcoleccionRef, {
        inicializado: true,
        timestamp: new Date().toISOString(),
        descripcion: `Colección ${subcoleccion} inicializada`
      });
      console.log(`✅ Subcolección '${subcoleccion}' creada con documento básico`);
    } catch (error) {
      console.error(`❌ Error creando subcolección '${subcoleccion}':`, error);
    }
  }
}