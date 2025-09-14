import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyArgNxd4GAew9WwzX6irlsWJ3-xGI7T-jM",
  authDomain: "nuestro-pulso-chat.firebaseapp.com",
  projectId: "nuestro-pulso-chat",
  storageBucket: "nuestro-pulso-chat.appspot.com",
  messagingSenderId: "268702824909",
  appId: "1:268702824909:web:0b4f2f849201abc94cac84",
  measurementId: "G-74ZBHG8TF4"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);