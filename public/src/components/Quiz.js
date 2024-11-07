import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  // Questions with options and answers
  const questions = [
    { question: 'Which control does a vehicle with automatic transmission not have?', answer: 'C', options: ['A-9', 'B-4', 'C-8', 'D-2'] },
    { question: 'Which control prevents a parked vehicle from moving?', answer: 'C', options: ['A-10', 'B-5', 'C-7', 'D-3'] },
    { question: 'Which controls are used to select a gear?', answer: 'B', options: ['A-9&7', 'B-6&8', 'C-6&1', 'D-6&9'] },
    { question: 'Stop lights (braking lights) must be visible in sunlight at a distance of at least:', answer: 'A', options: ['A-30 Meters', 'B-40 Meters', 'C-50 Meters', 'D-35 Meters'] },
    { question: 'When is it compulsory for a passenger to wear a seatbelt?', answer: 'C', options: ['A-Old people sitting in the back of the vehicle', 'B-Children or adults moving forward', 'C-All of the above','D-None of the above'] },
    { question: 'A drivers license must always be kept:', answer: 'C', options: ['A-Inside the vehicle', 'B-With the driver', 'C-All of the above', 'D-None of the above'] },
    { question: 'What does this sign indicate?', answer: 'A', options: ['A-Turn right at the next intersection', 'B-Turn right immediately', 'C-A sharp bend in the road to the right', 'D-The road comes to an end to the right'] },
    { question: 'This sign indicates the:', answer: 'B', options: ['A-Fastest speed you may drive', 'B-Slowest speed you may drive', 'C-Distance to the next offramp', 'D-Minimum weight allowance'] },
    { question: 'What does this sign indicate?', answer: 'C', options: ['A-Dead end ahead', 'B-Turn only left or right', 'C-Do not enter', 'D-Line on the road'] },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          handleSubmit(); // Submit when time's up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle when a user selects an answer
  const handleAnswerSelect = (selectedOption) => {
    const answerLetter = selectedOption.charAt(0); // Get the letter A, B, C, etc.
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = answerLetter; // Save answer for current question
      return updatedAnswers;
    });
  };

  // Move to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle quiz submission and calculate score
  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    localStorage.setItem('userScore', newScore); // Store score
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers)); // Store answers
    navigate('/results'); // Navigate to results page
  };

  // Format time (minutes:seconds)
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

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

