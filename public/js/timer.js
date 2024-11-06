 // Timer functionality
let timeLeft = 10 * 60; // 10 minutes in seconds
let timerInterval;

// Function to safely interact with localStorage
function safeLocalStorageSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn("Could not save to localStorage", e);
    }
}

function safeLocalStorageGetItem(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.warn("Could not access localStorage", e);
        return null;
    }
}

// Start the timer countdown
function startTimer() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerInterval = setInterval(() => {
            // Calculate minutes and seconds
            const minutes = Math.floor(timeLeft / 60);
            const seconds = String(timeLeft % 60).padStart(2, '0');
            timerElement.textContent = `${minutes}:${seconds}`;

            // Check if time is up
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Time is up!');
                safeLocalStorageSetItem('quizTimeLeft', 10 * 60); // Reset timer in local storage
                window.location.href = 'results.html'; // Redirect to results page
            } else {
                timeLeft--;
                safeLocalStorageSetItem('quizTimeLeft', timeLeft); // Save remaining time
            }
        }, 1000);
    }
}

// Initialize and start the timer when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        // Load remaining time from localStorage if it exists, otherwise start fresh
        const savedTime = safeLocalStorageGetItem('quizTimeLeft');
        if (savedTime) {
            timeLeft = parseInt(savedTime, 10);
        } else {
            safeLocalStorageSetItem('quizTimeLeft', timeLeft); // Save initial time to local storage
        }
        startTimer();
    }
});

// Optional: Reset timer (for testing)
document.getElementById('resetTimer').addEventListener('click', function() {
    clearInterval(timerInterval);
    timeLeft = 10 * 60; // Reset to 10 minutes
    safeLocalStorageSetItem('quizTimeLeft', timeLeft);
    startTimer();
});