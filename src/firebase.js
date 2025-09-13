import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Firebase project configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBV4g50dUdMJ6-a2R6MFqzL1JElgG51d8g",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nuestro-pulso-chat.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nuestro-pulso-chat",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nuestro-pulso-chat.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "268702824909",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:268702824909:web:0b4f2f849201abc94cac84",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-74ZBHG8TF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// Connect to emulators in development
if (import.meta.env.DEV) {
  // Uncomment these lines if using Firebase emulators in development
  // connectFirestoreEmulator(db, 'localhost', 8080);
  // connectFunctionsEmulator(functions, 'localhost', 5001);
}

// Initialize Analytics only on client side and when supported
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((error) => {
    console.warn('Analytics not supported:', error);
  });
}

export { app, analytics, auth, db, functions };
