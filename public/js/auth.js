// auth.js

// Sign-Up Handler
document.getElementById("signup-form").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic validation to ensure all fields are filled
    if (!name || !surname || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Store user data (use Firebase or database if available)
    const userData = { name, surname, email, password };
    localStorage.setItem(email, JSON.stringify(userData));

    alert("Sign-up successful! You can now log in.");
    window.location.href = "login.html";  // Redirect to login
});

// Login Handler
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const storedUserData = JSON.parse(localStorage.getItem(email));

    // Check if stored data exists and matches the entered password
    if (storedUserData && storedUserData.password === password) {
        // Save the user's name in session storage for displaying on other pages
        sessionStorage.setItem("loggedInUser", storedUserData.name);
        
        alert("Login successful!");
        window.location.href = "home.html";  // Redirect to home page
    } else {
        alert("Invalid email or password.");
    }
});

// Display User's Name on Home Page
document.addEventListener("DOMContentLoaded", function() {
    const userName = sessionStorage.getItem("loggedInUser");
    if (userName) {
        const welcomeElement = document.getElementById("user-welcome");
        if (welcomeElement) {
            welcomeElement.innerText = `Welcome, ${userName}!`;
        }
    }
});

