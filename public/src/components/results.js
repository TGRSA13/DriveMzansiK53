import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the backend on component mount
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/results'); // Adjust to your server endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data for debugging

        if (data.userScore != null) {
          setUserData(data);  // Set the retrieved data to state
        } else {
          navigate('/');  // Redirect to home if no score is found
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/'); // Redirect to home on fetch error
      }
    };

    fetchUserData();
  }, [navigate]);

  if (userData === null) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  // Destructure user data for easy access
  const { userScore, userName, quizPercentage } = userData;
  const resultMessage = userScore >= 7 ? 'You Passed!' : 'You Failed.';

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>User Email: {userName}</p>
      <p>Your score: {userScore} out of 9</p>
      <p>Percentage: {quizPercentage}%</p>
      <p>{resultMessage}</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default Results;
