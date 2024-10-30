// public/js/signup.js

// Import Firebase App and Auth modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCglZk-B-Phojvp31xGxxxACfyO4w6lges",
    authDomain: "drive-mzansi-app.firebaseapp.com",
    projectId: "drive-mzansi-app",
    storageBucket: "drive-mzansi-app.appspot.com",
    messagingSenderId: "1007195133421",
    appId: "1:1007195133421:web:1b7ec3cd063a31c05543e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if both passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    // Basic validation to ensure all fields are filled
    if (!name || !surname || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Check password strength (at least 6 characters in this case)
    if (password.length < 6) {
        alert('Password should be at least 6 characters long.');
        return;
    }

    // Create user with email and password using Firebase Auth
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            alert('Sign-Up successful! Redirecting to login page...');
            // Store user info in local storage
            localStorage.setItem('userName', name + ' ' + surname); // Store full name
            
            // Redirect to login page
            window.location.href = 'login.html'; 
        })
        .catch((error) => {
            // Enhanced error handling
            const errorCode = error.code;
            let errorMessage = error.message;
            
            if (errorCode === 'auth/email-already-in-use') {
                errorMessage = 'The email address is already in use. Please try another email.';
            } else if (errorCode === 'auth/invalid-email') {
                errorMessage = 'The email address is invalid. Please enter a valid email.';
            } else if (errorCode === 'auth/weak-password') {
                errorMessage = 'The password is too weak. Please choose a stronger password.';
            }

            alert(errorMessage); // Show error message to the user
        });
});
