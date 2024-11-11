import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/navBar';
import Quiz from './components/quiz';
import Results from './components/results';
import Profile from './components/profile';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  // Check if the user is authenticated on component mount
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, []);

  const handleSignup = (userName) => {
    setIsAuthenticated(true);
    setUserName(userName);
    localStorage.setItem('userName', userName);
  };

  const handleLogin = (userName) => {
    setIsAuthenticated(true);
    setUserName(userName);
    localStorage.setItem('userName', userName);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem('userName');
    localStorage.removeItem('userAnswers');
  };

  return (
    <Router>
      <div>
        <NavBar onLogout={handleLogout} />
        
        <Routes>
          <Route path="/" element={<h1>Welcome to Drive Mzansi</h1>} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          {/* Home route */}
          <Route
            path="/home"
            element={isAuthenticated ? <Home userName={userName} /> : <Navigate to="/login" />}
          />
          
          {/* Quiz, Results, Profile routes */}
          <Route
            path="/quiz"
            element={isAuthenticated ? <Quiz /> : <Navigate to="/login" />}
          />
          <Route
            path="/results"
            element={isAuthenticated ? <Results /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
