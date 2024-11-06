import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link> {/* Link to the Home page */}
      <Link to="/quiz">Start Quiz</Link> {/* Link to the Quiz page */}
      <Link to="/results">Results</Link> {/* Link to the Results page */}
      <Link to="/profile">Profile</Link> {/* Link to the Profile page */}
    </nav>
  );
};

export default NavBar;

