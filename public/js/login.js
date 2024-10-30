// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCglZk-B-Phojvp31xGxxxACfyO4w6lges",
    authDomain: "drive-mzansi-app.firebaseapp.com",
    projectId: "drive-mzansi-app",
    storageBucket: "drive-mzansi-app.appspot.com",
    messagingSenderId: "1007195133421",
    appId: "1:1007195133421:web:1b7ec3cd063a31c05543e4",
    measurementId: "G-WGTMR2MFRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get the login form
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Retrieve input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successful login
            alert("Login successful!");
            // Redirect to the profile or home page as needed
            window.location.href = "home.html";
        })
        .catch((error) => {
            // Enhanced error handling
            const errorCode = error.code;
            let errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
                errorMessage = "Incorrect password. Please try again.";
            } else if (errorCode === 'auth/user-not-found') {
                errorMessage = "No account found with this email. Please sign up.";
            } else if (errorCode === 'auth/invalid-email') {
                errorMessage = "Invalid email format. Please enter a valid email.";
            }

            alert(errorMessage); // Display the error message to the user
        });
});
