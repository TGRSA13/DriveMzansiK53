import React, { useEffect, useState } from 'react';

const Results = () => {
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [pastResults, setPastResults] = useState([]);
  
  useEffect(() => {
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

    // Retrieve user answers from localStorage
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
    
    let userScore = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    // Calculate score based on user answers
    for (const question in correctAnswers) {
      const correctAnswer = correctAnswers[question];
      const userAnswer = userAnswers[question];
      if (userAnswer === correctAnswer) {
        userScore++;
      }
    }

    // Calculate percentage
    const userPercentage = (userScore / totalQuestions) * 100;
    setScore(userScore);
    setPercentage(userPercentage);

    // Store past results in localStorage
    const storedResults = JSON.parse(localStorage.getItem('testResults')) || [];
    storedResults.push({
      score: userScore,
      percentage: userPercentage,
      date: new Date().toLocaleDateString()
    });
    setPastResults(storedResults);
    localStorage.setItem('testResults', JSON.stringify(storedResults));

  }, []);

  return (
    <div>
      <h1>Results</h1>
      <p id="score">You got {score} out of 9.</p>
      <p id="percentage">Your score is {percentage.toFixed(2)}%.</p>

      <h2>Past Results:</h2>
      <ul>
        {pastResults.length > 0 ? (
          pastResults.map((result, index) => (
            <li key={index}>
              {result.date}: {result.score} out of 9 - {result.percentage.toFixed(2)}%
            </li>
          ))
        ) : (
          <p>No past results available.</p>
        )}
      </ul>
    </div>
  );
};

export default Results;
