import { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';

export default function StudentForm({ onStudentAdded }) {
  const [form, setForm] = useState({
    name: '',
    roll: '',
    email: '',
    mobile: '',
    semester1: '',
    semester2: '',
    semester3: '',
    semester4: '',
    semester5: '',
    semester6: '',
    semester7: '',
    semester8: ''
  });

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate average of non-empty semesters
    const grades = [
      form.semester1, form.semester2, form.semester3, form.semester4,
      form.semester5, form.semester6, form.semester7, form.semester8
    ].map(Number).filter(n => !isNaN(n));

    const average = grades.length ? (grades.reduce((a, b) => a + b, 0) / grades.length) : 0;

    try {
      await axios.post('http://localhost:5000/api/students', { ...form, average }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Student added successfully');
      setForm({
        name: '',
        roll: '',
        email: '',
        mobile: '',
        semester1: '',
        semester2: '',
        semester3: '',
        semester4: '',
        semester5: '',
        semester6: '',
        semester7: '',
        semester8: ''
      });
      onStudentAdded(); // Refresh student list
    } catch (err) {
      alert('❌ Failed to add student');
      console.error(err);
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h3>Add New Student</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="roll" placeholder="Roll" value={form.roll} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />

      {[...Array(8)].map((_, i) => (
        <input
          key={i}
          type="number"
          name={`semester${i + 1}`}
          placeholder={`Semester ${i + 1}`}
          value={form[`semester${i + 1}`]}
          onChange={handleChange}
        />
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}
