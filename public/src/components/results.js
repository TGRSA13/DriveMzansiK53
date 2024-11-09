import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const [score, setScore] = useState(null);

  // Get score from localStorage
  useEffect(() => {
    const userScore = localStorage.getItem('userScore');
    if (userScore) {
      setScore(parseInt(userScore));
    }
  }, []);

  // Pass/Fail Logic
  const resultMessage = score >= 7 ? 'You Passed!' : 'You Failed.';

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Your score: {score} out of 9</p>
      <p>{resultMessage}</p>
      <button onClick={() => window.location.href = '/'}>Go Back to Home</button>
    </div>
  );
};

export default Results;