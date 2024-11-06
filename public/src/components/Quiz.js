import React from 'react';

const Quiz = ({ question, options }) => {
  return (
    <div>
      <h2>{question}</h2>
      {options.map((option, index) => (
        <div key={index}>
          <input type="radio" id={option} name="quiz" value={option} />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default Quiz;