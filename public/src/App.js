import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';  // Home component after logging in

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <NavBar navigateTo={(page) => setIsAuthenticated(page === 'logout' ? false : isAuthenticated)} />
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