import React from 'react';

const Home = ({ userName, onStartTest }) => {
  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <button onClick={onStartTest}>Start Test</button>
    </div>
  );
};

export default Home;
