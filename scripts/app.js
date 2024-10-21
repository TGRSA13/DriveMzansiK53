const express = require('express');
const app = express();
const port = 3000;

// Example route to serve quiz questions
app.get('/api/quiz', (req, res) => {
  const quizQuestions = [
    { question: 'Which control does a vehicle with automatic transmission not have?', options: ['A-1', 'B-6', 'C-8', 'D-11'], answer: 'C-8' },
    // Add more questions here
  ];
  res.json(quizQuestions);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});