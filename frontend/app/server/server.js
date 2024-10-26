// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample question data
const questionData = {
  Math: [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: 1
    },
    {
      question: "What is 5 x 6?",
      options: ["30", "25", "20", "15"],
      correct: 0
    }
    // Add more math questions...
  ],
  Science: [
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "He"],
      correct: 1
    },
    {
      question: "What planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 1
    }
    // Add more science questions...
  ],
  // Add other subjects similarly...
};

app.get('/api/generateQuiz', (req, res) => {
  const { subject, numQuestions } = req.query;
  const questions = questionData[subject] || [];
  const selectedQuestions = [];

  // Randomly select questions
  for (let i = 0; i < Math.min(numQuestions, questions.length); i++) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    selectedQuestions.push(questions[randomIndex]);
    questions.splice(randomIndex, 1); // Remove selected question
  }

  res.json({ questions: selectedQuestions });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
