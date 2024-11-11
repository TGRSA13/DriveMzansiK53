import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ userName }) => {
  const navigate = useNavigate();
  
  // State for tracking current question index, answers, and score
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Questions data
  const vehicleControls = [
    { question: "Which control does a vehicle with automatic transmission not have?", image: "images/controlstest.png", options: ["A-1", "B-6", "C-8", "D-11"], answer: "C-8" },
    { question: "Which control prevents a parked vehicle from moving?", image: "images/controlstest.png", options: ["A-10", "B-5", "C-7", "D-3"], answer: "C-7" },
    { question: "Which controls are used to select a gear?", image: "images/controlstest.png", options: ["A-9&7", "B-6&8", "C-6&1", "D-8&9"], answer: "B-6&8" }
  ];
  
  const roadRules = [
    { question: "Stop lights must be visible in sunlight at:", image: "images/rules.jpg", options: ["A-30 Meters", "B-50 Meters", "C-40 Meters", "D-35 Meters"], answer: "A-30 Meters" },
    { question: "When must a passenger wear a seatbelt?", image: "images/rules.jpg", options: ["A-Old people sitting in the back", "B-Children or adults moving forward", "C-All of the Above", "D-None of the Above"], answer: "C-All of the Above" },
    { question: "A driver's license must always be kept:", image: "images/rules.jpg", options: ["A-Inside the Vehicle", "B-With the Driver", "C-All the Above", "D-None of the Above"], answer: "C-All the Above" }
  ];
  
  const roadSigns = [
    { question: "What does this sign indicate?", image: "images/sign1.png", options: ["A-Turn right at the next intersection", "B-Turn right immediately", "C-A sharp bend in the road to the right", "D-The road comes to an end to the right"], answer: "A-Turn right at the next intersection" },
    { question: "What does this sign indicate?", image: "images/sign2.png", options: ["A-Fastest speed you may drive", "B-Slowest speed you may drive", "C-Distance to the next offramp", "D-Minimum weight allowance"], answer: "B-Slowest speed you may drive" },
    { question: "What does this sign indicate?", image: "images/sign3.png", options: ["A-Dead end ahead", "B-Turn only left or right", "C-Do not enter", "D-Line on the road"], answer: "C-Do not enter" }
  ];

  // Combine all questions in order
  const allQuestions = [...vehicleControls, ...roadRules, ...roadSigns];

  // Function to start the quiz
  const startTest = () => {
    navigate('/quiz');  // Navigate to the quiz page
    startTimer(); // Start the timer
  };

  // Timer logic
  const startTimer = () => {
    setIsTimerRunning(true);
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timerInterval);
        finishTest();
      }
    }, 1000);
  };

  const finishTest = () => {
    // Calculate score
    const finalScore = selectedAnswers.filter((answer, index) => answer === allQuestions[index].answer).length;
    setScore(finalScore);
    // Redirect to results page
    navigate('/results', { state: { score: finalScore, total: allQuestions.length } });
  };

  const handleAnswerSelection = (answer) => {
    // Save answer for the current question
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNavigation = (direction) => {
    if (direction === 'next' && currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      finishTest();  // Automatically finish the test when time is up
    }
  }, [timeLeft]);

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <p>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</p>
      
      {/* Question display */}
      <div>
        <h2>{allQuestions[currentQuestionIndex].question}</h2>
        <img src={allQuestions[currentQuestionIndex].image} alt="Question visual" />
        <div>
          {allQuestions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelection(option)}
              style={{
                backgroundColor: selectedAnswers[currentQuestionIndex] === option ? 'green' : 'initial'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div>
        <button onClick={() => handleNavigation('prev')} disabled={currentQuestionIndex === 0}>Previous</button>
        <button onClick={() => handleNavigation('next')} disabled={currentQuestionIndex === allQuestions.length - 1}>Next</button>
      </div>

      {/* Finish Test button */}
      {currentQuestionIndex === allQuestions.length - 1 && (
        <button onClick={finishTest}>Finish Test</button>
      )}

      <button onClick={startTest}>Start Test</button>
    </div>
  );
};

export default Home;

