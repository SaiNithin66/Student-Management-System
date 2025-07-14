import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    axios
      .get('http://localhost:5000/api/students', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setStudents(res.data))
      .catch(err => console.error('Failed to fetch students', err));
  }, [token]);

  return (
  <div className="dashboard-container">
    <h2>📋 Student Dashboard</h2>

    <button
      className="add-btn"
      onClick={() => alert('🔧 Add student form will go here!')}
    >
      ➕ Add Student
    </button>

    <table className="dashboard-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Roll</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Average</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length ? (
          students.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.roll}</td>
              <td>{s.email}</td>
              <td>{s.mobile}</td>
              <td>{s.average?.toFixed(2)}</td>
              <td>
                <button className="action-btn edit" onClick={() => alert('Edit student coming soon')}>✏️ Edit</button>
                <button className="action-btn delete" onClick={() => alert('Delete student coming soon')}>🗑️ Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="no-data">No student records found.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
}
