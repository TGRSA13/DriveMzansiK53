let currentQuestionIndex = 0;
let score = 0;
let currentSection = "control"; // Start with Controls section

// Questions for the Control Section
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
  }
];

// Questions for the Signs Section
const signsQuestions = [
  {
    question: "What does this sign indicate?",
    options: ["A-Turn right at the next intersection", "B-Turn right immediately", "C-A sharp bend in the road to the right", "D-The road comes to an end to the right"],
    answer: "A-Turn right at the next intersection",
  },
  {
    question: "This sign indicates the:",
    options: ["A-Fastest speed you may drive", "B-Slowest speed you may drive", "C-Distance to the next offramp", "D-Minimum weight allowance"],
    answer: "D-Minimum weight allowance",
  },
  {
    question: "This sign allows a driver to:",
    options: ["A-Turn right without stopping, if safe to do so.", "B-Turn left without stopping, if safe to do so.", "C-Come to a complete stop before turning left.", "D-Come to a stop immediately after turning left."],
    answer: "B-Turn left without stopping, if safe to do so.",
  }
];

// Questions for the Rules Section
const rulesQuestions = [
  {
    question: "Stop lights (braking lights) must be visible in sunlight at a distance of at least:",
    options: ["A-30 Meters", "B-40 Meters", "C-50 Meters", "D-35 Meters"],
    answer: "A-30 Meters",
  },
  {
    question: "When is it compulsory for a passenger to wear a seatbelt?",
    options: ["A-Old people sitting in the back of the vehicle", "B-Children or adults moving forward", "C-All of the above", "D-None of the above"],
    answer: "C-All of the above",
  },
  {
    question: "A driver's license must always be kept:",
    options: ["A-Inside the vehicle", "B-With the driver", "C-All of the above", "D-None of the above"],
    answer: "C-All of the above",
  }
];

// Function to get the current section's questions
function getQuestionsForSection(section) {
    if (section === "control") {
        return controlQuestions;
    } else if (section === "signs") {
        return signsQuestions;
    } else if (section === "rules") {
        return rulesQuestions;
    }
}

// Handle answer submission and navigation to the next question
function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    const questions = getQuestionsForSection(currentSection); // Get the current section's questions

    if (selectedOption) {
        const userAnswer = selectedOption.value;
        const correctAnswer = questions[currentQuestionIndex].answer;

        // Check if the answer is correct
        if (userAnswer === correctAnswer) {
            score += 1;
        }

        // Move to the next question
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            // Load the next question page within the same section
            window.location.href = `${currentSection}_question${currentQuestionIndex + 1}.html`;
        } else {
            // If the current section is completed, move to the next section
            if (currentSection === "control") {
                currentSection = "signs";
                currentQuestionIndex = 0;
                window.location.href = "signs_question1.html";
            } else if (currentSection === "signs") {
                currentSection = "rules";
                currentQuestionIndex = 0;
                window.location.href = "rules_question1.html";
            } else {
                // End of quiz, move to the results page
                window.location.href = "results.html";
            }
        }
    } else {
        alert("Please select an answer before proceeding.");
    }
}