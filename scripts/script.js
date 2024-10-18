// Simple quiz questions (you can add more)
const quizQuestions = [
  {
    question: "What does a red traffic light mean?",
    options: ["Stop", "Go", "Slow down", "Turn right"],
    answer: "Stop",
  },
  {
    question: "What is the maximum speed limit in urban areas?",
    options: ["60 km/h", "80 km/h", "100 km/h", "120 km/h"],
    answer: "60 km/h",
  },
  {
    question: "When should you use a seatbelt?",
    options: ["Always", "Only on highways", "When driving fast", "When driving at night"],
    answer: "Always",
  }
];

// Track current question and score
let currentQuestionIndex = 0;
let score = 0;

// Function to load a question
function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  
  // Clear previous options
  optionsElement.innerHTML = "";

  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option-button");
    button.onclick = () => handleAnswer(option);
    optionsElement.appendChild(button);
  });
}

// Handle user's answer and move to the next question
function handleAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedOption === currentQuestion.answer) {
    score++;
  }

  currentQuestionIndex++;

  // Check if it's the last question
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion(); // Load the next question
  } else {
    showResults(); // Show final results
  }
}

// Function to display the results
function showResults() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = `
    <h2>Quiz Complete!</h2>
    <p>Your score: ${score} / ${quizQuestions.length}</p>
    <button onclick="restartQuiz()">Restart Quiz</button>
  `;
}

// Restart quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

// Load the first question when the page loads
window.onload = loadQuestion;