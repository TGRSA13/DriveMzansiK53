// Controls section
const controlQuestions = [
  {
    question: "Which control does a vehicle with automatic transmission not have?",
    options: ["A-1", "B-6", "C-8", "D-11"],
    answer: "C-8",
  },
  {
    question: "Which control prevents a parked vehicle from moving?",
    options: ["A-10", "B-5", "C-7", "D-3"],
    answer: "C-7",
  },
  {
    question: "Which control is used to show that you intend turning?",
    options: ["A-5", "B-4", "C-9", "D-11"],
    answer: "A-5",
  },
  {
    question: "Which controls are used to select a gear?",
    options: ["A-9&7", "B-6&8", "C-6&1", "D-8&9"],
    answer: "B-6&8",
  },
  {
    question: "Which control is used to accelerate?",
    options: ["A-4", "B-8", "C-9", "D-10"],
    answer: "D-10",
  },
  {
    question: "Which controls are used to make a sharp turn to the left or right?",
    options: ["A-1,3,5,6&8 ", "B-3,4,5,9&10", "C-1,3,4,5,6,8,9&10", "D-3,4,5,6,10&11" ],
    answer: "C-1,3,4,5,6,8,9&10",
  }
];

// Signs section
const signsQuestions = [
 {
  question: "What does this sign indicate?",
  options: ["A-Turn right at the next intersection", "B-Turn right immediately", "C-A sharp bend in the road to the right", "D-The road comes to an end to the right"],
  answer: A-Turn right at the next intersection
 },
 {question: "This sign indicates the:",
  options:["A-Fastest speed you may drive ", "B-Slowest speed you may drive ", "C-Distance to the next offramp", "D-Minimum weight allowance"],
  answer: D-Minimum weight allowance
 }
 {question: "This sign allows a driver to:",
  options:["A-Turn right without stopping, if safe to do so.", "B-Turn left without stopping, if safe to do so.", "C-To come to a complete stop before turning left.", "D-Come to a stop immediately after turning left."],
  answer: B-Turn left without stopping, if safe to do so
 } 
 {question: "What should you do at this sign?",
  options: ["A-Stop when indicated to do so and only proceed when indicated to do so.", "B-Stop when indicated to do so and proceed when safe to do so.", "C-Slow down and pass the sign carefully.", "D-Stop and wait for the operator to leave before proceeding."],
  answer: A-Stop when indicated to do so and only proceed when indicated to do so.
 }
 {quetion:}
"]
 }
]

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