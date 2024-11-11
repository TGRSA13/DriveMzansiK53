import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Unified structure for all questions
const allQuestions = [
  {
    question: "Which control does a vehicle with automatic transmission not have?",
    options: ["A-1", "B-6", "C-8", "D-11"],
    answer: "C-8",
    category: "controls"  // Category of the question
  },
  {
    question: "Which control prevents a parked vehicle from moving?",
    options: ["A-10", "B-5", "C-7", "D-3"],
    answer: "C-7",
    category: "controls"
  },
  {
    question: "Which controls are used to select a gear?",
    options: ["A-9&7", "B-6&8", "C-6&1", "D-8&9"],
    answer: "B-6&8",
    category: "controls"
  },
  {
    question: "Stop lights must be visible in sunlight at:",
    options: ["A-30 Meters", "B-50 Meters", "C-40 Meters", "D-35 Meters"],
    answer: "A-30 Meters",
    category: "roadRules"
  },
  {
    question: "When must a passenger wear a seatbelt?",
    options: ["A-Old people sitting in the back", "B-Children or adults moving forward", "C-All of the Above", "D-None of the Above"],
    answer: "C-All of the Above",
    category: "roadRules"
  },
  {
    question: "A driver's license must always be kept:",
    options: ["A-Inside the Vehicle", "B-With the Driver", "C-All the Above", "D-None of the Above"],
    answer: "C-All the Above",
    category: "roadRules"
  },
  {
    question: "What does this sign indicate?",
    image: "images/sign1.png",  // Add image for signs questions
    options: ["A-Turn right at the next intersection", "B-Turn right immediately", "C-A sharp bend in the road to the right", "D-The road comes to an end to the right"],
    answer: "A-Turn right at the next intersection",
    category: "roadSigns"
  },
  {
    question: "What does this sign indicate?",
    image: "images/sign2.png",
    options: ["A-Fastest speed you may drive", "B-Slowest speed you may drive", "C-Distance to the next offramp", "D-Minimum weight allowance"],
    answer: "B-Slowest speed you may drive",
    category: "roadSigns"
  },
  {
    question: "What does this sign indicate?",
    image: "images/sign3.png",
    options: ["A-Dead end ahead", "B-Turn only left or right", "C-Do not enter", "D-Line on the road"],
    answer: "C-Do not enter",
    category: "roadSigns"
  }
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  // Handle user's answer selection
  const handleAnswerChange = (e) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = e.target.value;
    setUserAnswers(newAnswers);
  };

  // Move to next question and calculate score
  const handleNextQuestion = () => {
    const isCorrect = userAnswers[currentQuestion] === allQuestions[currentQuestion].answer;
    console.log(`Question ${currentQuestion + 1}: User answer is ${userAnswers[currentQuestion]}, Correct answer is ${allQuestions[currentQuestion].answer}`);

    // Only update score if the answer is correct
    if (isCorrect) {
      setScore(prevScore => prevScore + 1); // Correctly update score using previous score value
      console.log(`Correct! Score is now ${score + 1}`);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  // Final score submission
  const handleSubmit = () => {
    console.log(`Final score before submitting: ${score}`);
    const percentage = (score / allQuestions.length) * 100; // Calculate percentage

    // Save score and percentage to localStorage
    localStorage.setItem('userScore', score);
    localStorage.setItem('userPercentage', percentage);

    console.log("Score saved to localStorage:", score);
    console.log("Percentage saved to localStorage:", percentage);
    navigate("/results"); // Navigate to results page
  };

  return (
    <div>
      <h1>Quiz</h1>
      {currentQuestion < allQuestions.length ? (
        <div>
          <h2>{allQuestions[currentQuestion].question}</h2>
          {allQuestions[currentQuestion].image && <img src={allQuestions[currentQuestion].image} alt="quiz-img" />}
          <div>
            {allQuestions[currentQuestion].options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={userAnswers[currentQuestion] === option}
                  onChange={handleAnswerChange}
                />
                {option}
              </label>
            ))}
          </div>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      ) : (
        <div>
          <h2>Your Score: {score} / {allQuestions.length}</h2>
          <button onClick={handleSubmit}>Submit Results</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
