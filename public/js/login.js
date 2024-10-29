// public/js/login.js

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem(email));
  
    // Validate user credentials
    if (userData && userData.password === password) {
        alert('Login successful!');
        localStorage.setItem('loggedInUser', JSON.stringify(userData)); // Store user data for session
        window.location.href = 'home.html'; // Redirect to home page
    } else {
        alert('Invalid email or password. Please try again.');
    }
  });  