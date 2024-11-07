import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavBar = ({ navigateTo }) => {  // Accept navigateTo prop for logout functionality
  return (
    <nav>
      <Link to="/">Home</Link> {/* Link to the Home page */}
      <Link to="/quiz">Start Quiz</Link> {/* Link to the Quiz page */}
      <Link to="/results">Results</Link> {/* Link to the Results page */}
      <Link to="/profile">Profile</Link> {/* Link to the Profile page */}
      <button onClick={() => navigateTo('logout')}>Logout</button> {/* Logout button */}
    </nav>
  );
};

export default NavBar;