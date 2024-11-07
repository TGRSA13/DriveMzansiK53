document.addEventListener('DOMContentLoaded', function() {
  // Debugging: Check what’s in localStorage
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
  console.log("User Answers in localStorage:", userAnswers);
  
  if (!userAnswers) {
    alert("No answers found! Please make sure you've completed the quiz.");
    return;
  }

  // Check if correctAnswers is correctly populated
  const correctAnswers = {
    'cq1': 'C',
    'cq2': 'C',
    'cq3': 'B',
    'rq1': 'A',
    'rq2': 'C',
    'rq3': 'C',
    'sq1': 'A',
    'sq2': 'B',
    'sq3': 'C'
  };

  // Calculate score
  let score = 0;
  let totalQuestions = Object.keys(correctAnswers).length;

  for (let question in correctAnswers) {
    if (userAnswers[question] === correctAnswers[question]) {
      score++;
    }
  }

  // Calculate percentage
  let percentage = (score / totalQuestions) * 100;

  console.log(`Score: ${score}, Percentage: ${percentage}%`);

  // Display results
  document.getElementById('score').textContent = `Your Score: ${score} out of ${totalQuestions}`;
  document.getElementById('percentage').textContent = `Percentage: ${percentage.toFixed(2)}%`;

  // Optional: Store the result for history tracking
  const resultsHistory = JSON.parse(localStorage.getItem('testResults')) || [];
  resultsHistory.push({ score, percentage, date: new Date().toLocaleDateString() });
  localStorage.setItem('testResults', JSON.stringify(resultsHistory));
});
