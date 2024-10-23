let timer;
let timeLeft = 600; // 10 minutes
let currentQuestionIndex = 0;
let score = 0;

// Sample questions
const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    // Add more questions as needed
];

function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        document.getElementById('timerDisplay').innerText = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up!'); // Handle end of quiz here
            document.getElementById('restartButton').style.display = 'block'; // Show restart button
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Format time as mm:ss
}

function beginQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 600; // Reset time to 10 minutes
    startTimer();
    loadQuestion();
}

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('questionDisplay').innerText = questionData.question;
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = ''; // Clear previous options

    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('optionButton');
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedIndex) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedIndex === correctAnswer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function finishQuiz() {
    clearInterval(timer);
    alert(`Quiz finished! Your score: ${score}`);
    document.getElementById('restartButton').style.display = 'block'; // Show restart button
}

function restartQuiz() {
    clearInterval(timer);
    document.getElementById('restartButton').style.display = 'none'; // Hide restart button
    beginQuiz(); // Restart the quiz
}

// Attach the restart function to the restart button
document.getElementById('restartButton').onclick = restartQuiz;

// Call beginQuiz to start the quiz
beginQuiz();

