import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import NavBar from './components/navBar';
import Quiz from './components/quiz';
import Results from './components/results';
import Profile from './components/profile';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home';  // Home component after logging in

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Make sure this is imported and used correctly

  const handleSignup = () => {
    setIsAuthenticated(true);
    navigate('/home'); // Redirect to home page after signup
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/home'); // Redirect to home page after login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/'); // Redirect to welcome page after logout
  };

  return (
    <Router>
      <div>
        <NavBar navigateTo={handleLogout} /> {/* Pass handleLogout as prop to NavBar */}
        <Routes>
          <Route path="/" element={<h1>Welcome to Drive Mzansi</h1>} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          {/* Protected Routes - Redirect to login if not authenticated */}
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/quiz" element={isAuthenticated ? <Quiz /> : <Navigate to="/login" />} />
          <Route path="/results" element={isAuthenticated ? <Results /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;