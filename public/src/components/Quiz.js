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
  const [score, setScore] = useState(0);
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
          handleSubmit(); // Call the submit function when time is up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to handle answer selection
  const handleAnswerSelect = (answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer,
    }));
  };

  // Function to calculate score
  function scoreTest(userAnswers, questions) {
    let score = 0;

    // Compare the user's answers to the correct answers
    Object.keys(userAnswers).forEach((index) => {
      const question = questions[index];
      if (userAnswers[index] === question.answer) {
        score++;
      }
    });

    return score;
  }

  // Submit quiz and calculate score
  const handleSubmit = () => {
    const finalScore = scoreTest(userAnswers, questions);
    setScore(finalScore);

    // Store score in localStorage for displaying on results page
    localStorage.setItem('userScore', finalScore);

    // Navigate to the results page
    navigate('/results');
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Format time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  // Get the current question based on the index
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
        <p>Time Left: {formattedTime}</p>
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
