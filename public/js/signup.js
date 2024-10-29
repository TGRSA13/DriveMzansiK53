// public/js/signup.js

// This is the line where you initialize Firebase
// (Ensure this is only in one file)
const firebaseConfig = {
    apiKey: "AIzaSyCglZk-B-Phojvp31xGxxxACfyO4w6lges",
    authDomain: "drive-mzansi-app.firebaseapp.com",
    projectId: "drive-mzansi-app",
    storageBucket: "drive-mzansi-app.appspot.com",
    messagingSenderId: "1007195133421",
    appId: "1:1007195133421:web:1b7ec3cd063a31c05543e4"
};

// Initialize Firebase (only if it's not already initialized)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

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

    // Create user with email and password using Firebase Auth
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up
            alert('Sign-Up successful! Redirecting to login page...');
            // Store user info in local storage
            localStorage.setItem('userName', name + ' ' + surname); // Store full name
            
            // Redirect to login page
            window.location.href = 'login.html'; 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage); // Show error message to the user
        });
});
