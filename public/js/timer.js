// Timer functionality
let timeLeft = 10 * 60; // 10 minutes in seconds
let timerInterval;

function startTimer() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        clearInterval(timerInterval); // Clear any existing intervals
        
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Time is up!');
                window.location.href = 'results.html'; // Redirect to results page when time is up
            } else {
                let minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;
                if (seconds < 10) seconds = '0' + seconds;
                timerElement.textContent = `${minutes}:${seconds}`;
                timeLeft--; // Decrement timeLeft only if there's still time
            }
        }, 1000);
    }
}

function resetTimer() {
    timeLeft = 10 * 60; // Reset time to 10 minutes
    startTimer(); // Start the timer
}

// Start the timer when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    resetTimer(); // Reset the timer on page load
});

