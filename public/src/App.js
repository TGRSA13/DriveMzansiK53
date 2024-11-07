import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';  // Home component after logging in

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // For redirecting after login/signup

  const handleSignup = () => {
    setIsAuthenticated(true);
    // After signup, redirect to home page
    navigate('/home');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    // After login, redirect to home page
    navigate('/home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // After logout, redirect to the home page (or login page)
    navigate('/');
  };

  return (
    <Router>
      <div>
        <NavBar navigateTo={handleLogout} />
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