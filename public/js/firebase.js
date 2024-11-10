// firebase.js
// Import Firebase app and Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Your Firebase config (replace with your actual configuration from Firebase console)
const firebaseConfig = {
    apiKey: "AiZaSyCglZk-B-Phojvp31xGxxxACfyO4w6lges",
    authDomain: "drive-mzansi-app.firebaseapp.com",
    projectId: "drive-mzansi-app",
    storageBucket: "drive-mzansi-app.appspot.com",
    messagingSenderId: "1007195133421",
    appId: "1:1007195133421:web:1b7ec3cd063a31c05543e4",
    measurementId: "G-WGTMR2MFRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firestore functions
export { db, collection, addDoc, getDocs };