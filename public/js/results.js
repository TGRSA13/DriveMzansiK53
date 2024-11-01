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

// Function to display results
function displayResults() {
    // Retrieve user answers from localStorage
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
    console.log("User Answers Retrieved from localStorage:", userAnswers);  // Debugging

    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    // Calculate score based on user answers
    for (const question in correctAnswers) {
        const correctAnswer = correctAnswers[question];
        const userAnswer = userAnswers[question];

        console.log(`Question Key: ${question}, Correct Answer: ${correctAnswer}, User Answer: ${userAnswer}`);  // Debugging

        if (userAnswer === correctAnswer) {
            score++;
        }
    }

    // Calculate percentage
    const percentage = (score / totalQuestions) * 100;

    // Display results in the HTML
    const scoreElement = document.getElementById('score');
    const percentageElement = document.getElementById('percentage');

    if (scoreElement && percentageElement) {
        scoreElement.textContent = `You got ${score} out of ${totalQuestions}.`;
        percentageElement.textContent = `Your score is ${percentage.toFixed(2)}%.`;
    } else {
        console.warn("Score or Percentage element not found in HTML.");  // Debugging
    }

    // Store past results in localStorage
    const pastResults = JSON.parse(localStorage.getItem('testResults')) || [];
    pastResults.push({
        score: score,
        percentage: percentage,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('testResults', JSON.stringify(pastResults));
}

// Attach displayResults to DOMContentLoaded
document.addEventListener('DOMContentLoaded', displayResults);

