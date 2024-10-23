// Countdown timer logic
let timeLeft = localStorage.getItem('timeLeft') || 600; // 10 minutes in seconds

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  if (timeLeft === 0) {
    clearInterval(timerInterval);
    alert("Time's up!");
    window.location.href = 'results.html'; // Redirect to results page
  }

  timeLeft--;
  localStorage.setItem('timeLeft', timeLeft); // Store remaining time in localStorage
}

const timerInterval = setInterval(updateTimer, 1000);


