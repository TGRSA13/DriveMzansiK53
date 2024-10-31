let totalTime = 600; // 10 minutes in seconds

// Check if there's already time left in localStorage; if not, set it to totalTime
let timeLeft = parseInt(localStorage.getItem('timeLeft')) || totalTime;

// Select the timer display element
const timerDisplay = document.getElementById('timer');

// Update the timer display function
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
    alert("Time's up!"); // Alert the user when time is up
    localStorage.removeItem('timeLeft'); // Clear the stored time
    window.location.href = 'results.html'; // Redirect to the results page
  }
}

// Initialize the timer display on page load
updateTimerDisplay();

// Check if we already have a timer running before setting a new interval
if (!localStorage.getItem('timerStarted')) {
  localStorage.setItem('timerStarted', true);
  const timerInterval = setInterval(countdown, 1000);
}

