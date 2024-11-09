// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function() {

  // Get the form or the question container element
  const form = document.getElementById('questionForm');
  const nextButton = document.getElementById('nextButton');  // Button to move to next question
  const timerDisplay = document.getElementById('timer'); // Timer display (assuming you have an element for it)
  let timeLeft = parseInt(localStorage.getItem('quizTimeLeft')) || 600; // Get remaining time from localStorage or default to 600 seconds (10 minutes)

  // Countdown Timer with Persistent Storage
  function updateTimer() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      if (timeLeft <= 0) {
          clearInterval(timerInterval);
          alert("Time's up!");
          window.location.href = "results.html"; // Redirect to results page when time is up
      } else {
          timeLeft--;
          localStorage.setItem('quizTimeLeft', timeLeft); // Save the remaining time to localStorage
      }
  }

  // Start the countdown and update every second
  const timerInterval = setInterval(updateTimer, 1000);

  // Handle the next button click event
  nextButton.addEventListener('click', function(event) {
      event.preventDefault();  // Prevent form from submitting normally

      // Get the selected answer (assuming the answers are radio buttons with name 'control-question')
      const selectedAnswer = document.querySelector('input[name="sign-question3"]:checked');

      if (selectedAnswer) {
          // Store only the answer letter in localStorage (e.g., 'C', 'B', etc.)
      localStorage.setItem('sign-question3', selectedAnswer.value.charAt(0)); // Save only the letter of the answer

          // Save the remaining time
          localStorage.setItem('quizTimeLeft', timeLeft);

          // Redirect to the results page (or whatever page you want after the final question)
          window.location.href = 'results.html';  // Replace with your actual next question or results page

      } else {
          // If no answer is selected, alert the user
          alert("Please select an answer before proceeding.");
      }
  });

});

  