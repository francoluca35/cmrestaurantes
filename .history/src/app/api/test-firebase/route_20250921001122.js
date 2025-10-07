import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    console.log('=== TESTING FIREBASE CONNECTION ===');
    
    // Intentar agregar un documento de prueba
    const testData = {
      message: 'Test Firebase connection',
      timestamp: new Date(),
      test: true
    };
    
    console.log('Agregando documento de prueba...');
    const docRef = await addDoc(collection(db, 'test'), testData);
    console.log('Documento agregado con ID:', docRef.id);
    
    // Intentar leer documentos
    console.log('Leyendo documentos de prueba...');
    const querySnapshot = await getDocs(collection(db, 'test'));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log('Documentos encontrados:', documents.length);
    
    return NextResponse.json({
      success: true,
      message: 'Firebase connection successful',
      testDocumentId: docRef.id,
      documentsFound: documents.length,
      documents: documents
    });
    
  } catch (error) {
    console.error('=== ERROR TESTING FIREBASE ===');
    console.error('Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Firebase connection failed',
      details: error.message,
      code: error.code
    }, { status: 500 });
  }
}
