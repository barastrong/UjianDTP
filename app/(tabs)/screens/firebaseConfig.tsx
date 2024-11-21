import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-dWNQshTe_F1GJAM5hV0h0l0d1Rsji2Q",
  authDomain: "ujiandtp.firebaseapp.com",
  projectId: "ujiandtp",
  storageBucket: "ujiandtp.firebasestorage.app",
  messagingSenderId: "529230655637",
  appId: "1:529230655637:web:0cfc8b12df8b2cfcf7eb9c",
  measurementId: "G-6DQ4Y3SF66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
