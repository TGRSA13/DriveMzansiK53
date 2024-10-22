// Set the timer for 15 minutes (15 * 60 = 900 seconds)
let timeRemaining = 900;

function startTimer() {
    const timerDisplay = document.getElementById("timer");

    const countdown = setInterval(function() {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;

        // Display time in the format MM:SS
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.textContent = minutes + ":" + seconds;

        // When time runs out
        if (timeRemaining <= 0) {
            clearInterval(countdown);
            alert("Time is up!"); // You can redirect to the results page here if necessary
            window.location.href = "results.html"; // Redirect to results page when time is up
        }

        // Decrement time remaining by 1 second
        timeRemaining--;
    }, 1000); // 1000 milliseconds = 1 second
}

// Start the timer when the page loads
window.onload = function() {
    startTimer();
};