document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
  
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    if (password === confirmPassword) {
      alert('Sign-Up successful! Redirecting to login page...');
      window.location.href = 'login.html'; // Redirect to login page
    } else {
      alert('Passwords do not match. Please try again.');
    }
  });
  