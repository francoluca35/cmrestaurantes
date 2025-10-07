import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase para pruebas (Firebase Emulator)
const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
