// Correct answers for the quiz
const correctAnswers = {
    'q1': 'A-1',  // Update these to the actual correct answers
    'q2': 'B-6',
    'q3': 'C-8',
    // Add more correct answers for other questions
    // ...
};

// Function to display results
function displayResults() {
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    // Calculate score based on user answers
    for (const question in correctAnswers) {
        if (userAnswers[question] === correctAnswers[question]) {
            score++;
        }
    }

    // Calculate percentage
    const percentage = (score / totalQuestions) * 100;

    // Display results
    document.getElementById('score').textContent = `You got ${score} out of ${totalQuestions}.`;
    document.getElementById('percentage').textContent = `Your score is ${percentage.toFixed(2)}%.`;

    // Save the latest result to localStorage
    const pastResults = JSON.parse(localStorage.getItem('testResults')) || [];
    pastResults.push({ score: score, percentage: percentage });
    localStorage.setItem('testResults', JSON.stringify(pastResults));
}

// Function to restart the quiz
function restartQuiz() {
    localStorage.removeItem('userAnswers'); // Clear saved answers
    localStorage.removeItem('quizTimeLeft'); // Clear saved time
    window.location.href = "home.html"; // Redirect to home
}

// Event listener for the "Start Test" button
document.getElementById('restart-quiz').addEventListener('click', restartQuiz);

// Call displayResults when the page loads
document.addEventListener('DOMContentLoaded', displayResults);
