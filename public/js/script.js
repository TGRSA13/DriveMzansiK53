// Timer functionality
let timeLeft = 15 * 60; // 15 minutes in seconds
let timerInterval;

function startTimer() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerInterval = setInterval(() => {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            if (seconds < 10) seconds = '0' + seconds;
            timerElement.textContent = `${minutes}:${seconds}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Time is up!');
                window.location.href = '15.results.html'; // Redirect to results page when time is up
            }
            timeLeft--;
        }, 1000);
    }
}

// Start the timer when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('timer')) {
        startTimer();
    }
});