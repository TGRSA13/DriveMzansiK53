// auth.js

// Import Firebase authentication methods
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Initialize Firebase (use your own Firebase config)
const auth = getAuth();

// Function to handle user sign up
export function signup(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Sign up successful, user data available here
      const user = userCredential.user;
      console.log("User signed up:", user);
      // Redirect or handle after successful signup
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Signup error:", errorCode, errorMessage);
    });
}

// Function to handle user login
export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login successful, user data available here
      const user = userCredential.user;
      console.log("User logged in:", user);
      // Redirect or handle after successful login
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
    });
}

// Function to check if the user is logged in
export function checkUserLoggedIn(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in
      console.log("User is logged in:", user);
      callback(user);  // Pass user data to callback function
    } else {
      // User is not logged in
      console.log("No user is logged in");
      callback(null);
    }
  });
}

// Function to log out the user
export function logout() {
  auth.signOut()
    .then(() => {
      console.log("User logged out");
      // Redirect to home or login page
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
}
