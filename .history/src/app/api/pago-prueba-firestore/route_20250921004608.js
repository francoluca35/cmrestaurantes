import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

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
    
    // Verificar si el código de activación ya existe en codigosactivacion
    const codigoQuery = query(
      collection(db, 'codigosactivacion'),
      where('codActivacion', '==', data.codigoActivacion)
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
    
    // 1. Guardar en la colección 'restaurantes' con el código de activación como ID del documento
    const docRef = doc(db, 'restaurantes', data.codigoActivacion);
    await setDoc(docRef, restaurantData);
    console.log('Restaurante guardado con ID (código de activación):', data.codigoActivacion);
    
    // 2. Guardar en la colección 'codigosactivacion' como documento separado
    const codigoData = {
      resto: data.nombreRestaurante,
      codActivacion: data.codigoActivacion,
      email: data.email,
      cantUsuarios: parseInt(data.cantidadDispositivos) || 2,
      finanzas: data.conFinanzas === 'si',
      logo: '',
      password: data.password || '12345',
      timestamp: new Date().toISOString()
    };
    
    console.log('Guardando código de activación:', codigoData);
    const codigoRef = doc(db, 'codigosactivacion', data.codigoActivacion);
    await setDoc(codigoRef, codigoData);
    console.log('Código de activación guardado con ID (código de activación):', data.codigoActivacion);
    
    // 3. Crear todas las subcolecciones dentro del documento del restaurante
    const subcolecciones = [
      'CajaRegistradora',
      'Dinero', 
      'Ingresos',
      'Mpagos',
      'ServiciosComercio',
      'SueldoEmpleados',
      'bebidas',
      'configuracion',
      'mensajes',
      'menus',
      'mesas',
      'pedidosCocina',
      'stock',
      'tables',
      'users',
      'usuarios'
    ];
    
    console.log('Creando subcolecciones y documentos específicos dentro del restaurante...');
    
    // Crear documentos específicos en cada subcolección
    const documentosEspecificos = {
      'CajaRegistradora': {
        'caja_principal': {
          Apertura: "0",
          Extraccion: {
            "2025-09-08T23:37:19.266Z": {
              fecha: new Date("2025-09-08T23:37:19.266Z"),
              importe: 2800,
              motivo: "prueba"
            }
          },
          Ingresos: {
            "2025-08-27T19:43:05.074Z": {
              fecha: new Date("2025-08-27T19:43:05.074Z"),
              monto: "1300",
              motivo: "Cobranza mesa 02 - Sin nombre"
            }
          },
          estado: "activa",
          fechaActualizacion: "2025-08-21T07:13:38.258Z",
          fechaCreacion: "2025-08-21T07:13:38.258Z",
          nombre: "Caja Principal",
          saldo: 0,
          ultimaActualizacion: new Date("2025-09-08T23:37:20.000Z")
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
            {
              activo: true,
              nombre: "WiFi",
              precio: 0
            },
            {
              activo: false,
              nombre: "Estacionamiento",
              precio: 0
            },
            {
              activo: true,
              nombre: "Delivery",
              precio: 0
            }
          ]
        }
      },
      'configuracion': {
        'notificaciones': {
          isEnabled: true,
          soundType: "sonido2",
          updatedAt: new Date("2025-08-29T03:58:21.000Z"),
          volume: 1
        }
      },
      'tables': {
        'mesa2': {
          cliente: "",
          estado: "libre",
          fechaCreacion: "2025-08-21T07:13:45.426Z",
          id: "mesa2",
          lugar: "adentro",
          numero: "02",
          pedidoFinalizado: true,
          pedidoId: "GYab4O8Kb0a83VIqUimQ",
          position: {
            x: 200,
            y: 44
          },
          productos: [],
          tamaño: "normal",
          total: 0,
          updatedAt: new Date("2025-09-08T20:44:14.000Z")
        },
        'mesa3': {
          cliente: "",
          estado: "libre",
          fechaCreacion: "2025-08-21T07:13:45.426Z",
          id: "mesa3",
          lugar: "adentro",
          numero: "03",
          pedidoFinalizado: true,
          pedidoId: "GYab4O8Kb0a83VIqUimQ",
          position: {
            x: 200,
            y: 44
          },
          productos: [],
          tamaño: "normal",
          total: 0,
          updatedAt: new Date("2025-09-08T20:44:14.000Z")
        },
        'mesa4': {
          cliente: "",
          estado: "libre",
          fechaCreacion: "2025-08-21T07:13:45.426Z",
          id: "mesa4",
          lugar: "adentro",
          numero: "04",
          pedidoFinalizado: true,
          pedidoId: "GYab4O8Kb0a83VIqUimQ",
          position: {
            x: 200,
            y: 44
          },
          productos: [],
          tamaño: "normal",
          total: 0,
          updatedAt: new Date("2025-09-08T20:44:14.000Z")
        },
        'mesa5': {
          cliente: "",
          estado: "libre",
          fechaCreacion: "2025-08-21T07:13:45.426Z",
          id: "mesa5",
          lugar: "adentro",
          numero: "05",
          pedidoFinalizado: true,
          pedidoId: "GYab4O8Kb0a83VIqUimQ",
          position: {
            x: 200,
            y: 44
          },
          productos: [],
          tamaño: "normal",
          total: 0,
          updatedAt: new Date("2025-09-08T20:44:14.000Z")
        },
        'mesa6': {
          cliente: "",
          estado: "libre",
          fechaCreacion: "2025-08-21T07:13:45.426Z",
          id: "mesa6",
          lugar: "adentro",
          numero: "06",
          pedidoFinalizado: true,
          pedidoId: "GYab4O8Kb0a83VIqUimQ",
          position: {
            x: 200,
            y: 44
          },
          productos: [],
          tamaño: "normal",
          total: 0,
          updatedAt: new Date("2025-09-08T20:44:14.000Z")
        },
        'mesa7': {
          cliente: "",
          estado: "libre",
          fechaCreacion: "2025-08-21T07:13:45.426Z",
          id: "mesa7",
          lugar: "adentro",
          numero: "07",
          pedidoFinalizado: true,
          pedidoId: "GYab4O8Kb0a83VIqUimQ",
          position: {
            x: 200,
            y: 44
          },
          productos: [],
          tamaño: "normal",
          total: 0,
          updatedAt: new Date("2025-09-08T20:44:14.000Z")
        },
        'mesa8': {
          cliente: "",
          estado: "libre",
          fechaCreacion: "2025-08-21T07:13:45.426Z",
          id: "mesa8",
          lugar: "adentro",
          numero: "08",
          pedidoFinalizado: true,
          pedidoId: "GYab4O8Kb0a83VIqUimQ",
          position: {
            x: 200,
            y: 44
          },
          productos: [],
          tamaño: "normal",
          total: 0,
          updatedAt: new Date("2025-09-08T20:44:14.000Z")
        },
        'mesa9': {
          cliente: "",
          estado: "libre",
          fechaCreacion: "2025-08-21T07:13:45.426Z",
          id: "mesa9",
          lugar: "adentro",
          numero: "09",
          pedidoFinalizado: true,
          pedidoId: "GYab4O8Kb0a83VIqUimQ",
          position: {
            x: 200,
            y: 44
          },
          productos: [],
          tamaño: "normal",
          total: 0,
          updatedAt: new Date("2025-09-08T20:44:14.000Z")
        }
      },
      'users': {
        'admin': {
          activo: true,
          esAdmin: true,
          fechaCreacion: "2025-09-08T23:29:30.068Z",
          imagen: "",
          password: data.password || "admin",
          rol: "admin",
          usuario: "admin"
        }
      }
    };

    // Crear documentos específicos
    for (const [subcoleccion, documentos] of Object.entries(documentosEspecificos)) {
      try {
        console.log(`Creando documentos en subcolección '${subcoleccion}'...`);
        for (const [documentoId, documentoData] of Object.entries(documentos)) {
          const docRef = doc(db, 'restaurantes', data.codigoActivacion, subcoleccion, documentoId);
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
        const subcoleccionRef = collection(db, 'restaurantes', data.codigoActivacion, subcoleccion);
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
    console.log('Restaurante ID (código de activación):', data.codigoActivacion);
    console.log('Código Activación ID (código de activación):', data.codigoActivacion);
    console.log('Pago ID:', paymentRef.id);
    console.log('Subcolecciones creadas:', subcolecciones.length);
    
    return NextResponse.json({
      success: true,
      message: 'Pago de prueba procesado y datos guardados en Firestore exitosamente',
      restaurantId: data.codigoActivacion,
      codigoActivacionId: data.codigoActivacion,
      paymentId: paymentRef.id,
      codigoActivacion: data.codigoActivacion,
      transactionId: paymentData.transactionId,
      estructura: {
        colecciones: {
          restaurantes: 'restaurantes',
          codigosactivacion: 'codigosactivacion',
          pagos: 'pagos'
        },
        documentoRestaurante: {
          id: data.codigoActivacion,
          coleccion: 'restaurantes',
          subcolecciones: subcolecciones
        },
        documentoCodigoActivacion: {
          id: data.codigoActivacion,
          coleccion: 'codigosactivacion'
        }
      },
      datos: {
        restaurante: restaurantData,
        codigoActivacion: codigoData,
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
