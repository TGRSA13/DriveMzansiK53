// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Get the form or the question container element
    const form = document.getElementById('questionForm');
    const nextButton = document.getElementById('nextButton'); // Button to move to next question
    const timerDisplay = document.getElementById('timer'); // Assuming you have a timer element
    let timeLeft = parseInt(localStorage.getItem('quizTimeLeft')) || 600; // Get remaining time from localStorage or default to 600 seconds (10 minutes)

    // Countdown Timer with Persistent Storage
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            window.location.href = "results.html"; // Redirect to results page when time is up
        } else {
            timeLeft--;
            localStorage.setItem('quizTimeLeft', timeLeft); // Save the remaining time to localStorage
        }
    }

    // Start the countdown and update every second
    const timerInterval = setInterval(updateTimer, 1000);

    // Handle the next button click event
    nextButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        // Get the selected answer (assuming the answers are radio buttons with name 'control-question')
        const selectedAnswer = document.querySelector('input[name="control-question"]:checked');

        if (selectedAnswer) {
            // Store the selected answer in localStorage
            localStorage.setItem('control_question3', selectedAnswer.value); // Use a specific key like 'control_question3'

            // Save the remaining time
            localStorage.setItem('quizTimeLeft', timeLeft);

            // Redirect to the next question page (or next section, if it's the last question in the Controls section)
            window.location.href = 'rules_question1.html'; // Go to the first question in the Rules section (update as necessary)
        } else {
            // If no answer is selected, alert the user
            alert("Please select an answer before proceeding.");
        }
    });
});



  