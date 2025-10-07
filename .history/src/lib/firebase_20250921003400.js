import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyC1LtI3PL45VN8kmtkjHLJkSJUxQtW0fts",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "comandas-multiples.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "comandas-multiples",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "comandas-multiples.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "904018062842",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:904018062842:web:7db46c62161e7c89768843"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
