// Import Firebase SDKs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AiZaSyCglZk-B-Phojvp31xGxxxACfyO4w6lges",
    authDomain: "drive-mzansi-app.firebaseapp.com",
    projectId: "drive-mzansi-app",
    storageBucket: "drive-mzansi-app.appspot.com",
    messagingSenderId: "1007195133421",
    appId: "1:1007195133421:web:1b7ec3cd063a31c05543e4"
};

// Initialize Firebase if not already initialized
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (error) {
    if (error.code === 'app/duplicate-app') {
        console.log("Firebase app already initialized."); // Log if app is already initialized
        app = firebase.app(); // Use the existing app
    } else {
        console.error("Error initializing Firebase app:", error); // Log other errors
    }
}

const auth = getAuth(app);
const db = getFirestore(app);

// Display user name if logged in
onAuthStateChanged(auth, async (user) => {
    console.log("User state changed:", user); // Log the user object

    if (user) {
        console.log("User logged in:", user); // Confirm user is logged in
        console.log("User UID:", user.uid); // Log user UID

        try {
            // Retrieve user data from Firestore
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('user-name').textContent = `${userData.name} ${userData.surname}`;
            } else {
                console.error("No user document found in Firestore.");
                document.getElementById('user-name').textContent = 'User';
            }
        } catch (error) {
            console.error("Error fetching user data:", error.message);
            alert("Error fetching user data: " + error.message);
        }
    }
});

// Logout button functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth).then(() => {
        alert('You have been logged out.');
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Sign Out Error:', error);
        alert("Error during sign-out.");
    });
});

// Function to start the test
document.getElementById('start-test-btn').addEventListener('click', () => {
    // Redirect to controls_question1.html
    window.location.href = 'controls_question1.html';
});


