import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV4g50dUdMJ6-a2R6MFqzL1JElgG51d8g",
  authDomain: "nuestro-pulso-chat.firebaseapp.com",
  projectId: "nuestro-pulso-chat",
  storageBucket: "nuestro-pulso-chat.appspot.com",
  messagingSenderId: "268702824909",
  appId: "1:268702824909:web:0b4f2f849201abc94cac84",
  measurementId: "G-74ZBHG8TF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on the client side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const auth = getAuth(app);

export { app, analytics, auth };
