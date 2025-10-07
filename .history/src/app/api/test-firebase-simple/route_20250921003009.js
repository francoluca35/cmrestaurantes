import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function GET() {
  try {
    console.log('=== TESTING FIREBASE CONNECTION SIMPLE ===');
    
    // Intentar agregar un documento de prueba
    const docRef = await addDoc(collection(db, 'test'), {
      message: 'Hello from Firebase test!',
      timestamp: new Date(),
      test: true
    });
    
    console.log('Document written with ID: ', docRef.id);
    
    return NextResponse.json({
      success: true,
      message: 'Firebase connection successful',
      docId: docRef.id,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('=== FIREBASE CONNECTION ERROR ===');
    console.error('Error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    return NextResponse.json({
      success: false,
      message: 'Firebase connection failed',
      error: error.message,
      code: error.code,
      details: {
        message: error.message,
        stack: error.stack
      }
    }, { status: 500 });
  }
}
