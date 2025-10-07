import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const RESTAURANTS_FILE = path.join(DATA_DIR, 'restaurants.json');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');

export async function GET() {
  try {
    console.log('=== VERIFICANDO DATOS GUARDADOS ===');
    
    const result = {
      success: true,
      data: {
        restaurants: [],
        payments: []
      },
      files: {
        restaurantsExists: existsSync(RESTAURANTS_FILE),
        paymentsExists: existsSync(PAYMENTS_FILE),
        restaurantsPath: RESTAURANTS_FILE,
        paymentsPath: PAYMENTS_FILE
      }
    };
    
    // Leer restaurantes
    if (existsSync(RESTAURANTS_FILE)) {
      try {
        const restaurantsData = await readFile(RESTAURANTS_FILE, 'utf-8');
        result.data.restaurants = JSON.parse(restaurantsData);
        console.log('Restaurantes encontrados:', result.data.restaurants.length);
      } catch (error) {
        console.error('Error leyendo restaurantes:', error);
        result.data.restaurants = [];
      }
    }
    
    // Leer pagos
    if (existsSync(PAYMENTS_FILE)) {
      try {
        const paymentsData = await readFile(PAYMENTS_FILE, 'utf-8');
        result.data.payments = JSON.parse(paymentsData);
        console.log('Pagos encontrados:', result.data.payments.length);
      } catch (error) {
        console.error('Error leyendo pagos:', error);
        result.data.payments = [];
      }
    }
    
    console.log('=== RESULTADO ===');
    console.log('Total restaurantes:', result.data.restaurants.length);
    console.log('Total pagos:', result.data.payments.length);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('=== ERROR VERIFICANDO DATOS ===');
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error verificando datos',
      details: error.message
    }, { status: 500 });
  }
}
