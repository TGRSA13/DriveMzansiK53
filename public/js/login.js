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

// Initialize Firebase only if it hasn't been initialized yet
let app;
if (!firebase.apps.length) {
    app = initializeApp(firebaseConfig);
} else {
    console.log("Firebase app already initialized.");
    app = firebase.app();
}

const auth = getAuth(app);

// Set authentication persistence
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        // Attach login form submission event
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission

            // Retrieve user inputs
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Attempt to sign in with provided credentials
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("User signed in:", userCredential.user); // Log user info for debugging
                    alert("Login successful!");
                    window.location.href = "home.html"; // Redirect to the home page
                })
                .catch((error) => {
                    console.error("Login failed:", error); // Log error details
                    let errorMessage;

                    // Provide user-friendly error messages
                    switch (error.code) {
                        case 'auth/wrong-password':
                            errorMessage = "Incorrect password. Please try again.";
                            break;
                        case 'auth/user-not-found':
                            errorMessage = "No account found with this email. Please sign up.";
                            break;
                        case 'auth/invalid-email':
                            errorMessage = "Invalid email format. Please enter a valid email.";
                            break;
                        default:
                            errorMessage = error.message;
                    }

                    alert(errorMessage); // Display error to the user
                });
        });
    })
    .catch((error) => {
        console.error("Error setting persistence:", error);
    });
