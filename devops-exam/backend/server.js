require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'devops-exam-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Student registration
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, age, profession } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO students (first_name, last_name, email, age, profession) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, age, profession]
    );
    
    // Store student in session
    req.session.studentId = result.insertId;
    res.status(201).json({ 
      id: result.insertId,
      name: `${firstName} ${lastName}`
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Get exam questions
app.get('/questions', async (req, res) => {
  if (!req.session.studentId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const [questions] = await db.query(
      `SELECT id, question, 
      JSON_OBJECT('A', option_a, 'B', option_b, 'C', option_c, 'D', option_d) AS options,
      correct_answer, category 
      FROM questions ORDER BY RAND() LIMIT 15`
    );
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Submit exam
app.post('/submit', async (req, res) => {
  if (!req.session.studentId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { answers } = req.body;
  const studentId = req.session.studentId;
  
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
    if (score >= 13) message = 'Excellent! You are AWS Certified! 🎉';
    else if (score >= 10) message = 'Great job! You have DevOps potential! 👍';
    else if (score >= 8) message = 'Good effort! Keep learning DevOps! 📚';
    else message = 'Practice makes perfect! Try again! 💪';

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
