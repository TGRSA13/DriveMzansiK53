// public/js/signup.js

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
  
    // Store user data in localStorage
    const userData = { name, surname, email, password };
    localStorage.setItem(email, JSON.stringify(userData));
  
    alert('Sign-Up successful! Redirecting to login page...');
    window.location.href = 'login.html'; // Redirect to login page
  });
  