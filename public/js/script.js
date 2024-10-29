// Timer functionality
let timeLeft = 10 * 60; // 10 minutes in seconds
let timerInterval;

function startTimer() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerInterval = setInterval(() => {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            if (seconds < 10) seconds = '0' + seconds;
            timerElement.textContent = `${minutes}:${seconds}`;
            
            // Check if time is up
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Time is up!');
                window.location.href = 'results.html'; // Redirect to results page when time is up
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