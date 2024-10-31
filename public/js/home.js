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

// Initialize Firebase only if it hasn't been initialized yet
let app;
if (!firebase.apps.length) {
    app = initializeApp(firebaseConfig);
} else {
    console.log("Firebase app already initialized.");
    app = firebase.app();
}

const auth = getAuth(app);
const db = getFirestore(app);

// Check if user is logged in and retrieve their name from Firestore
onAuthStateChanged(auth, async (user) => {
    console.log("User state changed:", user);
    if (user) {
        try {
            // User is signed in, retrieve their name from Firestore
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('user-name').textContent = `${userData.name} ${userData.surname}`;
            } else {
                console.error("No such document!");
                document.getElementById('user-name').textContent = 'User'; // Fallback if no name found
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("An error occurred while fetching user data.");
        }
    } else {
        // No user is signed in, redirect to index page or show an error
        console.log("No user logged in, redirecting to index.html");
        alert("No user logged in. Redirecting to login page.");
        window.location.href = "index.html";
    }
});

// Logout button functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth).then(() => {
        alert('You have been logged out.');
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Sign Out Error', error);
        alert("An error occurred during sign-out.");
    });
});
