import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, collection, addDoc } from './firebase';  // Import Firestore functions

const Results = () => {
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  // Get score from localStorage
  useEffect(() => {
    const userScore = localStorage.getItem('userScore');
    if (userScore) {
      setScore(parseInt(userScore));
      saveScoreToFirestore(userScore);  // Save the score to Firestore when it's available
    }
  }, []);

  // Save the score to Firestore
  const saveScoreToFirestore = async (userScore) => {
    const userId = localStorage.getItem('userId');  // Assuming the userId is stored in localStorage
    try {
      const docRef = await addDoc(collection(db, 'scores'), {
        userId: userId,  // Use userId for identification
        score: userScore,
        timestamp: new Date(),
      });
      console.log("Score saved with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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
