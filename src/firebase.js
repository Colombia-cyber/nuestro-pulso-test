import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";

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

// Firestore utility functions
export const saveFavorite = async (item) => {
  try {
    // Check if favorite already exists
    const favoritesRef = collection(db, 'favorites');
    const q = query(favoritesRef, where('url', '==', item.url));
    const existingDocs = await getDocs(q);
    
    if (!existingDocs.empty) {
      console.log('Item already in favorites');
      return { success: false, message: 'Item already in favorites' };
    }
    
    // Add new favorite
    const docRef = await addDoc(favoritesRef, {
      ...item,
      createdAt: new Date(),
      userId: auth.currentUser?.uid || 'anonymous'
    });
    
    console.log('Favorite saved with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving favorite: ', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const getFavorites = async (userId) => {
  try {
    const favoritesRef = collection(db, 'favorites');
    const userIdFilter = userId || auth.currentUser?.uid || 'anonymous';
    const q = query(
      favoritesRef, 
      where('userId', '==', userIdFilter),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting favorites: ', error);
    return [];
  }
};

export { app, analytics, auth, db };
