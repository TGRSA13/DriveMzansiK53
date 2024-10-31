let totalTime = 600; // 10 minutes in seconds

// Check if there’s already time left in localStorage, else set to totalTime
let timeLeft = parseInt(localStorage.getItem('timeLeft')) || totalTime;

const timerDisplay = document.getElementById('timer');

// Update the timer display
function updateTimerDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Countdown function
function countdown() {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimerDisplay();
    localStorage.setItem('timeLeft', timeLeft); // Store the remaining time
  } else {
    clearInterval(timerInterval);
    alert("Time's up!");
    window.location.href = 'results.html'; // Redirect to results page
  }
}

// Initialize the timer on page load
updateTimerDisplay();
const timerInterval = setInterval(countdown, 1000);
