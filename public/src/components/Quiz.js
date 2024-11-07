import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const questions = [
    { question: 'Which control does a vehicle with automatic transmission not have?', answer: 'C', options: ['A-9', 'B-4', 'C-8', 'D-2'] },
    { question: 'Which control prevents a parked vehicle from moving?', answer: 'C', options: ['A-10', 'B-5', 'C-7', 'D-3'] },
    { question: 'Which controls are used to select a gear?', answer: 'B', options: ['A-9&7', 'B-6&8', 'C-6&1', 'D-6&9'] },
    { question: 'Stop lights (braking lights) must be visible in sunlight at a distance of at least:', answer: 'A', options: ['A-30 Meters', 'B-40 Meters', 'C-50 Meters', 'D-35 Meters'] },
    { question: 'When is it compulsory for a passenger to wear a seatbelt?', answer: 'C', options: ['A-Old people sitting in the back of the vehicle', 'B-Children or adults moving forward', 'C-All of the above', 'D-None of the above'] },
    { question: 'A drivers license must always be kept:', answer: 'C', options: ['A-Inside the vehicle', 'B-With the driver', 'C-All of the above', 'D-None of the above'] },
    { question: 'What does this sign indicate?', answer: 'A', options: ['A-Turn right at the next intersection', 'B-Turn right immediately', 'C-A sharp bend in the road to the right', 'D-The road comes to an end to the right'] },
    { question: 'This sign indicates the:', answer: 'B', options: ['A-Fastest speed you may drive', 'B-Slowest speed you may drive', 'C-Distance to the next offramp', 'D-Minimum weight allowance'] },
    { question: 'What does this sign indicate?', answer: 'C', options: ['A-Dead end ahead', 'B-Turn only left or right', 'C-Do not enter', 'D-Line on the road'] },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          alert('Time is up!');
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswerSelect = (answer) => {
    const selectedAnswer = answer[0]; // Take only the first character (A, B, C, etc.)
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedAnswer,
    }));
  };

  const handleSubmit = () => {
    let newScore = 0;

    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        newScore++;
      }
    });

    setScore(newScore);

    localStorage.setItem('userScore', newScore);
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));

    navigate('/results');
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

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
              backgroundColor: userAnswers[currentQuestionIndex] === option[0] ? 'lightgreen' : '',
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <div>
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>
      <div>Time left: {formattedTime}</div>
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default Quiz;
