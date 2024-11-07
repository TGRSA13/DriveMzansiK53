// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function() {

  // Get the form or the question container element
  const form = document.getElementById('questionForm');
  const nextButton = document.getElementById('nextButton');  // Button to move to next question

  // Handle the next button click event
  nextButton.addEventListener('click', function(event) {
    event.preventDefault();  // Prevent form from submitting normally

    // Get the selected answer (assuming the answers are radio buttons with name 'control-question')
    const selectedAnswer = document.querySelector('input[name="control-question"]:checked');

    if (selectedAnswer) {
      // Store the selected answer in localStorage with a unique key for each question
      localStorage.setItem('control-question1', selectedAnswer.value);

      // Redirect to the next question page (controls_question2.html)
      window.location.href = 'controls_question2.html';

    } else {
      // If no answer is selected, alert the user
      alert("Please select an answer before proceeding.");
    }
  });

});

  