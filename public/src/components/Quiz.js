import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  // Define your quiz questions and answers
  const questions = [
    { question: 'What is the control question 1?', answer: 'A', options: ['A', 'B', 'C'] },
    { question: 'What is the control question 2?', answer: 'B', options: ['A', 'B', 'C'] },
    { question: 'What is the control question 3?', answer: 'C', options: ['A', 'B', 'C'] },
    { question: 'What is the signs question 1?', answer: 'B', options: ['A', 'B', 'C'] },
    { question: 'What is the signs question 2?', answer: 'A', options: ['A', 'B', 'C'] },
    { question: 'What is the signs question 3?', answer: 'C', options: ['A', 'B', 'C'] },
    { question: 'What is the rules question 1?', answer: 'C', options: ['A', 'B', 'C'] },
    { question: 'What is the rules question 2?', answer: 'A', options: ['A', 'B', 'C'] },
    { question: 'What is the rules question 3?', answer: 'B', options: ['A', 'B', 'C'] }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const navigate = useNavigate(); // For navigation

  // Start Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          alert('Time is up!');
          handleSubmit(); // Automatically submit when time is up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer,
    }));
  };

  // Handle quiz submission
  const handleSubmit = () => {
    let newScore = 0;

    // Check user answers and calculate score
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        newScore++;
      }
    });

    setScore(newScore); // Update score
    navigate('/results'); // Navigate to results page after submission
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Get current time in minutes and seconds format
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  // Get the current question and options
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      <div>
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            style={{
              backgroundColor: userAnswers[currentQuestionIndex] === option ? 'lightgreen' : '',
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <div>
        <p>Time Left: {formattedTime}</p> {/* Display timer */}
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNextQuestion}>Next Question</button>
        ) : (
          <button onClick={handleSubmit}>Submit Quiz</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
