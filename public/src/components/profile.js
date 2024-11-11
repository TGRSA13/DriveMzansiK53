import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, collection, getDocs } from './firebase';

const Profile = () => {
  const [userResults, setUserResults] = useState([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve userName from localStorage if not passed as prop
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      navigate('/login'); // Redirect to login if no userName is found
    }
  }, [navigate]);

  useEffect(() => {
    if (userName) {
      const fetchResults = async () => {
        try {
          // Retrieve results from Firestore
          const querySnapshot = await getDocs(collection(db, "quizResults"));
          const results = [];
          
          // Filter results for the specific user
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.userName === userName) {
              results.push(data);
            }
          });
          
          setUserResults(results);
        } catch (error) {
          console.error("Error fetching results: ", error);
        }
      };

      fetchResults();
    }
  }, [userName]);

  const handleLogout = () => {
    // Clear user data and navigate to login
    localStorage.removeItem('userName');
    navigate('/login');
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
              {result.date.toDate().toLocaleString()}: {result.score} out of 9 - {(result.score / 9 * 100).toFixed(2)}%
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
