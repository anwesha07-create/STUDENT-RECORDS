const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory DB (you can replace with MongoDB/MySQL later)
let students = [];
let nextId = 1;

// Routes

// Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Add a student
app.post('/students', (req, res) => {
  const { name, roll, course, year } = req.body;

  if (!name || !roll || !course || !year) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newStudent = { id: nextId++, name, roll, course, year };
  students.push(newStudent);

  res.status(201).json(newStudent);
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
