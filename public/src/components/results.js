// Correct answers for the quiz
const correctAnswers = {
  'cq1': 'C', // Controls question 1
  'cq2': 'C', // Controls question 2
  'cq3': 'B', // Controls question 3
  'rq1': 'A', // Rules question 1
  'rq2': 'C', // Rules question 2
  'rq3': 'C', // Rules question 3
  'sq1': 'A', // Signs question 1
  'sq2': 'B', // Signs question 2
  'sq3': 'C'  // Signs question 3
};

// Function to display results
function displayResults() {
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
 
  // If no user answers found in localStorage, show a message
  if (Object.keys(userAnswers).length === 0) {
      document.getElementById('no-results').textContent = "No answers found. Please complete the quiz first.";
      document.getElementById('score').textContent = "";
      document.getElementById('percentage').textContent = "";
      return; // Exit early if no answers are found
  }

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
  pastResults.push({
      score: score,
      percentage: percentage,
      date: new Date().toLocaleDateString()
  });
  localStorage.setItem('testResults', JSON.stringify(pastResults));
}

// Function to restart the quiz
function restartQuiz() {
  localStorage.removeItem('userAnswers'); // Clear saved answers
  localStorage.removeItem('quizTimeLeft'); // Clear saved time (if relevant)
  window.location.href = "index.html"; // Redirect to home
}

// Event listener for the "Start Test" button
document.getElementById('restart-quiz').addEventListener('click', restartQuiz);

// Call displayResults when the page loads
document.addEventListener('DOMContentLoaded', displayResults);

