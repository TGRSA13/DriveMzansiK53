let timeRemaining = 15 * 60; // 15 minutes in seconds

// Check if there's a saved time in localStorage
if (localStorage.getItem('timeRemaining')) {
    timeRemaining = parseInt(localStorage.getItem('timeRemaining'), 10);
}

// Function to update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Timer countdown function
function startTimer() {
    const intervalId = setInterval(() => {
        timeRemaining--;

        // Update the timer display
        updateTimerDisplay();

        // Save the remaining time in localStorage
        localStorage.setItem('timeRemaining', timeRemaining);

        // Check if the time is up
        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            alert('Time is up! Redirecting to results page...');
            window.location.href = 'results.html'; // Change this to your results page
        }
    }, 1000);
}

// Start the timer when the page loads
window.onload = () => {
    updateTimerDisplay();
    startTimer();
};