import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userName }) => {
  const [userResults, setUserResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve past results for the specific user from localStorage
    const storedResults = JSON.parse(localStorage.getItem('testResults')) || [];
    // Filter results based on userName (assuming it's stored as part of the result)
    const userSpecificResults = storedResults.filter(result => result.userName === userName);
    setUserResults(userSpecificResults);
  }, [userName]);

  const handleLogout = () => {
    // Clear user data from localStorage and navigate to login
    localStorage.removeItem('userName');
    localStorage.removeItem('userAnswers');
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {userName}!</p>
      <button onClick={handleLogout}>Logout</button>

      <h2>Your Score History:</h2>
      <ul>
        {userResults.length > 0 ? (
          userResults.map((result, index) => (
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

export default Profile;
