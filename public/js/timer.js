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
                if (seconds < 10) seconds = '0' + seconds; // Add leading zero
                timerElement.textContent = `${minutes}:${seconds}`;
                timeLeft--; // Decrement timeLeft only if there's still time
            }
        }, 1000);
    }
}

function resetTimer() {
    timeLeft = 10 * 60; // Reset time to 10 minutes
}

// This function can be called to start the timer
function beginTest() {
    resetTimer(); // Reset the timer
    startTimer(); // Start the timer
}

// Listen for the test to start (for example, from a button click in home.js)
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment this if you want the timer to start automatically on this page load
    // resetTimer(); // Reset the timer on page load
});
