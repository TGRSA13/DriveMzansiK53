import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import NavBar from './components/NavBar'; // Adjust the import path if needed
import Quiz from './components/Quiz';     // Adjust the import path if needed
import Results from './components/Results'; // Import Results component
import Profile from './components/Profile'; // Import Profile component (if you have it)

const App = () => {
  return (
    <Router> {/* Wrap the entire app in Router */}
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>Welcome to Drive Mzansi</h1>} /> {/* Home page route */}
          <Route path="/quiz" element={<Quiz />} /> {/* Quiz page route */}
          <Route path="/results" element={<Results />} /> {/* Results page route */}
          <Route path="/profile" element={<Profile />} /> {/* Profile page route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
