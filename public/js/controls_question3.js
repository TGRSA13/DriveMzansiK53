// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Get the form or the question container element
    const form = document.getElementById('questionForm');
    const nextButton = document.getElementById('nextButton'); // Button to move to next question
    const timerDisplay = document.getElementById('timer'); // Timer display

    // Ensure all required elements are present in the DOM
    if (!form || !nextButton || !timerDisplay) {
        console.error('One or more required elements are missing from the DOM');
        return;
    }

    // Retrieve the remaining time from localStorage or set to 10 minutes (600 seconds) initially
    let timeLeft = parseInt(localStorage.getItem('quizTimeLeft')) || 600;

    // Update the timer display
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // If the time runs out, go to the results page
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            window.location.href = "results.html"; // Redirect to results page when time is up
        } else {
            timeLeft--;
            localStorage.setItem('quizTimeLeft', timeLeft); // Save remaining time
        }
    }

    // Start the countdown timer
    const timerInterval = setInterval(updateTimer, 1000);

    // Handle the next button click event
    nextButton.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent form from submitting normally

        // Get the selected answer (assuming the answers are radio buttons with name 'control-question')
        const selectedAnswer = document.querySelector('input[name="control-question3"]:checked');

        if (selectedAnswer) {
            // Store only the answer letter (e.g., 'C', 'B', etc.) in localStorage
            localStorage.setItem('control-question3', selectedAnswer.value.charAt(0)); 

            // Save the remaining time
            localStorage.setItem('quizTimeLeft', timeLeft);

            // Redirect to the next question page (next page in the quiz)
            window.location.href = 'rules_question1.html'; // Update as needed
        } else {
            // If no answer is selected, alert the user
            alert("Please select an answer before proceeding.");
        }
    });
});
