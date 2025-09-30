import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Helper to safely get environment variables with error handling
const getFirebaseEnv = (key, fallback = null) => {
  const value = import.meta.env[key];
  if (!value && !fallback) {
    console.warn(`⚠️ Firebase config missing: ${key}. Please check your .env file.`);
  }
  return value || fallback;
};

const firebaseConfig = {
  apiKey: getFirebaseEnv('VITE_FIREBASE_API_KEY', "demo-api-key"),
  authDomain: getFirebaseEnv('VITE_FIREBASE_AUTH_DOMAIN', "demo-project.firebaseapp.com"),
  projectId: getFirebaseEnv('VITE_FIREBASE_PROJECT_ID', "demo-project"),
  storageBucket: getFirebaseEnv('VITE_FIREBASE_STORAGE_BUCKET', "demo-project.appspot.com"),
  messagingSenderId: getFirebaseEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', "123456789"),
  appId: getFirebaseEnv('VITE_FIREBASE_APP_ID', "1:123456789:web:abcdef"),
  measurementId: getFirebaseEnv('VITE_FIREBASE_MEASUREMENT_ID', "G-XXXXXXXXXX")
};

// Validate critical Firebase configuration
const isMissingConfig = !import.meta.env.VITE_FIREBASE_API_KEY || 
                       !import.meta.env.VITE_FIREBASE_PROJECT_ID;

if (isMissingConfig) {
  console.warn(`
🔥 Firebase Configuration Warning:
Critical Firebase environment variables are missing.
Please update your .env file with proper Firebase credentials.
Currently running with demo/fallback values.

Required variables:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID
  `);
}

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase initialization failed:', error);
  throw new Error('Firebase configuration is invalid. Please check your environment variables.');
}

// Use conditional export for analytics to avoid issues in development
let analytics = null;
try {
  if (typeof window !== 'undefined' && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.warn('Analytics not available:', error.message);
}

export { analytics };
export const auth = getAuth(app);
export const db = getFirestore(app);