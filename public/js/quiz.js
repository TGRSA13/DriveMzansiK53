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
              // End of quiz, save results and move to the results page
              const percentage = (score / 9) * 100; // Assuming total questions are 9
              saveTestResult(score, percentage); // Save the result
              window.location.href = "results.html"; // Redirect to results page
          }
      }
  } else {
      alert("Please select an answer before proceeding.");
  }
}
