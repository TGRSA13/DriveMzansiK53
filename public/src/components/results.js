// Correct answers for the quiz
const correctAnswers = {
  'control-question1': 'C', // Controls question 1
  'control-question2': 'C', // Controls question 2
  'control-question3': 'B', // Controls question 3
  'rule-question1': 'A', // Rules question 1
  'rule-question2': 'C', // Rules question 2
  'rule-question3': 'C', // Rules question 3
  'sign-question1': 'A', // Signs question 1
  'sign-question2': 'B', // Signs question 2
  'sign-question3': 'C'  // Signs question 3
};

// Function to display results
function displayResults() {
  console.log("displayResults function called");

  // Retrieve user answers from localStorage
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
  console.log("Retrieved userAnswers from localStorage:", userAnswers);

  // Check if there are user answers
  if (Object.keys(userAnswers).length === 0) {
    document.getElementById('no-results').textContent = "No answers found. Please complete the quiz first.";
    document.getElementById('score').textContent = "";
    document.getElementById('percentage').textContent = "";
    return;
  }

  let score = 0;
  const totalQuestions = Object.keys(correctAnswers).length;

  // Calculate score based on user answers
  for (const question in correctAnswers) {
    // Ensure the key matches and the answer is correct
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
  console.log("Results displayed and saved successfully.");
}

// Function to restart the quiz
function restartQuiz() {
  console.log("Restart quiz clicked");
  localStorage.removeItem('userAnswers'); // Clear saved answers
  localStorage.removeItem('quizTimeLeft'); // Clear saved time (if relevant)
  window.location.href = "index.html"; // Redirect to home
}

// Event listener for the "Restart Quiz" button
document.getElementById('restart-quiz').addEventListener('click', restartQuiz);

// Call displayResults when the page loads
document.addEventListener('DOMContentLoaded', displayResults);


