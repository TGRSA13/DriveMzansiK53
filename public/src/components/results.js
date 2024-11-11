import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  // Get score from localStorage on component mount
  useEffect(() => {
    const userScore = localStorage.getItem('userScore'); // Ensure this key is consistent
    console.log('Retrieved score from localStorage:', userScore);
    if (userScore !== null) {
      setScore(parseInt(userScore));
    } else {
      console.log('No score found in localStorage');
      navigate('/'); // Redirect to home if no score is found
    }
  }, [navigate]);

  if (score === null) {
    return <div>Loading...</div>; // Show loading while score is null
  }

  // Pass/Fail Logic
  const resultMessage = score >= 7 ? 'You Passed!' : 'You Failed.';

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Your score: {score} out of 9</p>
      <p>{resultMessage}</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default Results;
