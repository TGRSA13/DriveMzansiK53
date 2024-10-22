let userAnswers = []; // Store user answers
const correctAnswers = {
    "controls_question1.html": "C",
    "controls_question2.html": "B",
    "controls_question3.html": "A",
    "rules_question1.html": "C",
    "rules_question2.html": "C",
    "rules_question3.html": "B",
    "signs_question1.html": "C",
    "signs_question2.html": "D",
    "signs_question3.html": "A"
};

function submitAnswer(currentPage) {
    const form = document.getElementById('question-form');
    const selectedAnswer = form.answer.value; // Get selected answer
    
    if (selectedAnswer) {
        userAnswers.push(selectedAnswer); // Store answer
    }

    // Navigate to the next question or calculate score
    if (currentPage === "signs_question3.html") {
        calculateScore();
    } else {
        navigateToNextQuestion(currentPage);
    }
}

function navigateToNextQuestion(currentPage) {
    // Move to the next question based on the current page
    if (currentPage === "controls_question1.html") {
        window.location.href = 'controls_question2.html';
    } else if (currentPage === "controls_question2.html") {
        window.location.href = 'controls_question3.html';
    } else if (currentPage === "rules_question1.html") {
        window.location.href = 'rules_question2.html';
    } else if (currentPage === "rules_question2.html") {
        window.location.href = 'rules_question3.html';
    } else if (currentPage === "signs_question1.html") {
        window.location.href = 'signs_question2.html';
    } else if (currentPage === "signs_question2.html") {
        window.location.href = 'signs_question3.html';
    }
}

function calculateScore() {
    let score = 0;

    // Check answers against correct answers
    userAnswers.forEach((answer, index) => {
        const questionKey = Object.keys(correctAnswers)[index];
        if (answer === correctAnswers[questionKey]) {
            score++;
        }
    });

    // Store score in localStorage and navigate to results page
    localStorage.setItem('quizScore', score);
    window.location.href = 'results.html';
}
