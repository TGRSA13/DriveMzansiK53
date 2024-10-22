// quiz.js

let currentQuestionIndex = 0;
let correctAnswers = 0;
const totalQuestions = 9; // Update this with the actual number of questions

// Array of correct answers for the questions (example)
const correctAnswersArray = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A']; // Update this with actual answers

// Function to handle the answer submission
function submitAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        if (selectedAnswer.value === correctAnswersArray[currentQuestionIndex]) {
            correctAnswers++;
        }

        // Move to the next question or show results
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            window.location.href = `controls_question${currentQuestionIndex + 1}.html`; // Link to next question
        } else {
            // Redirect to results page
            localStorage.setItem('score', correctAnswers);
            window.location.href = 'results.html'; // Change to your results page
        }
    } else {
        alert('Please select an answer before proceeding!');
    }
}

// Attach event listener to buttons
document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.querySelector('.nav-btn'); // Update selector based on your HTML
    if (nextButton) {
        nextButton.addEventListener('click', submitAnswer);
    }
});
