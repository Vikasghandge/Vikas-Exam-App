// server.js placeholder

const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Student registration
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, age, profession } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO students (first_name, last_name, email, age, profession) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, age, profession]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Get exam questions
app.get('/questions', async (req, res) => {
  try {
    const [questions] = await db.query(
      'SELECT id, question, options, category FROM questions ORDER BY RAND() LIMIT 15'
    );
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Submit exam
app.post('/submit', async (req, res) => {
  const { studentId, answers } = req.body;
  try {
    const [questions] = await db.query('SELECT id, correct_answer FROM questions');
    const questionMap = new Map(questions.map(q => [q.id, q.correct_answer]));
    
    let score = 0;
    answers.forEach(answer => {
      if (questionMap.get(answer.questionId) === answer.selectedOption) {
        score++;
      }
    });

    await db.query(
      'INSERT INTO exams (student_id, score, total) VALUES (?, ?, ?)',
      [studentId, score, answers.length]
    );

    let message = '';
    if (score >= 13) message = 'Excellent! You are AWSome!';
    else if (score >= 10) message = 'Great job! Almost there!';
    else if (score >= 8) message = 'Good effort! Keep learning!';
    else message = 'Practice makes perfect! Try again!';

    res.json({
      score,
      total: answers.length,
      wrong: answers.length - score,
      message
    });
  } catch (err) {
    res.status(500).json({ error: 'Exam submission failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
