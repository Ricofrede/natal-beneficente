// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2qC_xO5gg9nECL-iInkTbj0-x94tmZIQ",
    authDomain: "natal-beneficente.firebaseapp.com",
    projectId: "natal-beneficente",
    storageBucket: "natal-beneficente.appspot.com",
    messagingSenderId: "615578786558",
    appId: "1:615578786558:web:31a83b4a75f5dcca5c23af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);