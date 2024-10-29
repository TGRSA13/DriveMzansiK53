// signup.js

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

  // Firebase authentication
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Store additional user info in Firestore
      return firebase.firestore().collection('users').doc(user.uid).set({
        name: name,
        surname: surname,
        email: email
      });
    })
    .then(() => {
      alert('Sign-Up successful! Redirecting to login page...');
      window.location.href = 'login.html'; // Redirect to login page
    })
    .catch((error) => {
      console.error('Error during sign-up:', error);
      alert('Error during sign-up: ' + error.message);
    });
});

  