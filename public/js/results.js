// Correct answers for the quiz
const correctAnswers = {
    'control_q1': 'C',
    'control_q2': 'C',
    'control_q3': 'B',
    'rules_q1': 'A',
    'rules_q2': 'C',
    'rules_q3': 'C',
    'signs_q1': 'A',
    'signs_q2': 'B',
    'signs_q3': 'C'
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
    pastResults.push({ score: score, percentage: percentage, date: new Date().toLocaleDateString() });
    localStorage.setItem('testResults', JSON.stringify(pastResults));
}

// Function to restart the quiz
function restartQuiz() {
    localStorage.removeItem('userAnswers'); // Clear saved answers
    localStorage.removeItem('quizTimeLeft'); // Clear saved time
    window.location.href = "home.html"; // Redirect to home
}

// Event listener for the "Restart Quiz" button
document.getElementById('restart-quiz').addEventListener('click', restartQuiz);

// Call displayResults when the page loads
document.addEventListener('DOMContentLoaded', displayResults);
