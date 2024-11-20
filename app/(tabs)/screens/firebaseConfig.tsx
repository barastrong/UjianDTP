// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app);  // Mendapatkan instance Firestore


export { db};