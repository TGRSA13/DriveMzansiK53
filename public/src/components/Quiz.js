import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const questions = [
    { question: 'Which control does a vehicle with automatic transmission not have?', answer: 'C-8', options: ['A-9', 'B-4', 'C-8', 'D-2'] },
    { question: 'Which control prevents a parked vehicle from moving?', answer: 'C-7', options: ['A-10', 'B-5', 'C-7', 'D-3'] },
    { question: 'Which controls are used to select a gear?', answer: 'B-6&8', options: ['A-9&7', 'B-6&8', 'C-6&1', 'D-6&9'] },
    { question: 'Stop lights (braking lights) must be visible in sunlight at a distance of at least:', answer: 'A-30 Meters', options: ['A-30 Meters', 'B-40 Meters', 'C-50 Meters', 'D-35 Meters'] },
    { question: 'When is it compulsory for a passenger to wear a seatbelt?', answer: 'C-All of the above', options: ['A-Old people sitting in the back of the vehicle', 'B-Children or adults moving forward', 'C-All of the above', 'D-None of the above'] },
    { question: 'A drivers license must always be kept:', answer: 'C-All of the above', options: ['A-Inside the vehicle', 'B-With the driver', 'C-All of the above', 'D-None of the above'] },
    { question: 'What does this sign indicate?', answer: 'A-Turn right at the next intersection', options: ['A-Turn right at the next intersection', 'B-Turn right immediately', 'C-A sharp bend in the road to the right', 'D-The road comes to an end to the right'] },
    { question: 'This sign indicates the:', answer: 'B-Slowest speed you may drive', options: ['A-Fastest speed you may drive', 'B-Slowest speed you may drive', 'C-Distance to the next offramp', 'D-Minimum weight allowance'] },
    { question: 'What does this sign indicate?', answer: 'C-Do not enter', options: ['A-Dead end ahead', 'B-Turn only left or right', 'C-Do not enter', 'D-Line on the road'] },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const navigate = useNavigate();

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          alert('Time is up!');
          handleSubmit(); // Call submit when time is up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer,
    }));
  };

  // Handle submission and score calculation
  const handleSubmit = () => {
    const correctAnswers = questions.reduce((acc, curr, index) => {
      acc[index] = curr.answer;
      return acc;
    }, {});

    let score = 0;
    Object.keys(userAnswers).forEach((index) => {
      if (userAnswers[index] === correctAnswers[index]) {
        score++;
      }
    });

    localStorage.setItem('userScore', score); // Store the score

    navigate('/results'); // Navigate to results page
  };

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
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

      <div>
        <h3>Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</h3>
      </div>

      <div>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit Quiz</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
