// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AiZaSyCglZk-B-Phojvp31xGxxxACfyO4w6lges",
    authDomain: "drive-mzansi-app.firebaseapp.com",
    projectId: "drive-mzansi-app",
    storageBucket: "drive-mzansi-app.appspot.com",
    messagingSenderId: "1007195133421",
    appId: "1:1007195133421:web:1b7ec3cd063a31c05543e4",
    measurementId: "G-WGTMR2MFRY"
};

// Initialize Firebase if not already initialized
let app;
if (!firebase.apps.length) {
    app = initializeApp(firebaseConfig);
} else {
    console.log("Firebase app already initialized.");
    app = firebase.app();
}

const auth = getAuth(app);

// Set persistence to ensure session is maintained
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        // Attach login form submission handler
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Retrieve input values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Sign in with email and password
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("User signed in:", userCredential.user); // Log user info
                    alert("Login successful!");
                    // Redirect to the home page
                    window.location.href = "home.html";
                })
                .catch((error) => {
                    console.error("Login failed:", error); // Log error for debugging
                    const errorCode = error.code;
                    let errorMessage = error.message;

                    // User-friendly error messages
                    if (errorCode === 'auth/wrong-password') {
                        errorMessage = "Incorrect password. Please try again.";
                    } else if (errorCode === 'auth/user-not-found') {
                        errorMessage = "No account found with this email. Please sign up.";
                    } else if (errorCode === 'auth/invalid-email') {
                        errorMessage = "Invalid email format. Please enter a valid email.";
                    }

                    alert(errorMessage); // Display error message to user
                });
        });
    })
    .catch((error) => {
        console.error("Persistence error:", error);
    });
