// Correct answers for the quiz
const correctAnswers = {
    'cq1': 'C',  // Controls question 1
    'cq2': 'C',  // Controls question 2
    'cq3': 'B',  // Controls question 3
    'rq1': 'A',  // Rules question 1
    'rq2': 'C',  // Rules question 2
    'rq3': 'C',  // Rules question 3
    'sq1': 'A',  // Signs question 1
    'sq2': 'B',  // Signs question 2
    'sq3': 'C'   // Signs question 3
};

// Function to safely retrieve data from localStorage
function safeLocalStorageGetItem(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.warn("Could not access localStorage", e);
        return null;
    }
}

// Function to display results
function displayResults() {
    // Retrieve user answers from localStorage
    const userAnswers = JSON.parse(safeLocalStorageGetItem('userAnswers')) || {};
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

    // Save the latest result to localStorage for record-keeping
    const pastResults = JSON.parse(safeLocalStorageGetItem('testResults')) || [];
    pastResults.push({
        score: score,
        percentage: percentage,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('testResults', JSON.stringify(pastResults));
}

// Call displayResults when the page loads
document.addEventListener('DOMContentLoaded', displayResults);
