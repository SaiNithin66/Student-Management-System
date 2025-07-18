const express = require('express');
const Student = require('../models/Student');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Get all students
router.get('/', verifyToken, async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Create student
router.post('/', verifyToken, async (req, res) => {
  const {
    name, roll, email, mobile,
    semester1, semester2, semester3, semester4,
    semester5, semester6, semester7, semester8
  } = req.body;

  // Calculate average only for valid entered semesters
  const semesterMarks = [
    semester1, semester2, semester3, semester4,
    semester5, semester6, semester7, semester8
  ];

  const validMarks = semesterMarks
    .map(mark => Number(mark))
    .filter(mark => !isNaN(mark) && mark > 0);  // Skip blank, null, undefined, and 0

  const total = validMarks.reduce((sum, mark) => sum + mark, 0);
  const avg = validMarks.length > 0 ? total / validMarks.length : 0;

  const newStudent = new Student({
    name, roll, email, mobile,
    semester1, semester2, semester3, semester4,
    semester5, semester6, semester7, semester8,
    average: avg
  });

  const saved = await newStudent.save();
  res.json(saved);
});

// Update student
router.put('/:id', verifyToken, async (req, res) => {
  const {
    semester1, semester2, semester3, semester4,
    semester5, semester6, semester7, semester8
  } = req.body;

  // Recalculate average for updated semesters
  const semesterMarks = [
    semester1, semester2, semester3, semester4,
    semester5, semester6, semester7, semester8
  ];

  const validMarks = semesterMarks
    .map(mark => Number(mark))
    .filter(mark => !isNaN(mark) && mark > 0);  // Consider only valid CGPAs

  const total = validMarks.reduce((sum, mark) => sum + mark, 0);
  const avg = validMarks.length > 0 ? total / validMarks.length : 0;

  const updatedStudent = {
    ...req.body,
    average: avg
  };

  const updated = await Student.findByIdAndUpdate(req.params.id, updatedStudent, { new: true });
  res.json(updated);
});

// Delete student
router.delete('/:id', verifyToken, async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
});

module.exports = router;
