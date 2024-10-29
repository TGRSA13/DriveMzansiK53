// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCglZk-B-Phojvp31xGxxxACfyO4w6lges",
    authDomain: "drive-mzansi-app.firebaseapp.com",
    projectId: "drive-mzansi-app",
    storageBucket: "drive-mzansi-app.appspot.com",
    messagingSenderId: "1007195133421",
    appId: "1:1007195133421:web:1b7ec3cd063a31c05543e4",
    measurementId: "G-WGTMR2MFRY" // Optional, only needed for Analytics
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get the login form
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in with email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            alert("Login successful!");
            window.location.href = "profile.html"; // Redirect to profile page
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage); // Display the error message
        });
});