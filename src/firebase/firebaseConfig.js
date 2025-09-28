// Import the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config (replace with your project settings)

const firebaseConfig = {
    apiKey: "AIzaSyC11eIV_NKwaQ-Yx7_lo36sGxQkV8mblfk",
    authDomain: "floatchat-1867b.firebaseapp.com",
    projectId: "floatchat-1867b",
    storageBucket: "floatchat-1867b.appspot.com",   // ✅ fixed
    messagingSenderId: "1033505659405",
    appId: "1:1033505659405:web:a40255de1563849bf8d344",
    measurementId: "G-GQPK9TJWKC"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth + Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
