import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('=== TEST SIMPLE ===');
    
    return NextResponse.json({
      success: true,
      message: 'Test simple funcionando',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error en test simple:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
