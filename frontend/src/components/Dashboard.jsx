import { useEffect, useState } from 'react';
import axios from 'axios';
import StudentForm from './StudentForm';
import './Dashboard.css';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
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

  const refreshStudents = () => {
    axios
      .get('http://localhost:5000/api/students', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setStudents(res.data))
      .catch(err => console.error('Failed to fetch students', err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      refreshStudents();
    } catch (err) {
      alert('Failed to delete student');
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>📋 Student Dashboard</h2>

      <button
        className="add-btn"
        onClick={() => {
          setEditData(null);
          setShowForm(prev => !prev);
        }}
      >
        ➕ {showForm ? 'Hide Form' : 'Add Student'}
      </button>

      {showForm && <StudentForm onStudentAdded={refreshStudents} editData={editData} setEditData={setEditData} />}

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
                  <button
                    className="action-btn edit"
                    onClick={() => {
                      setEditData(s);
                      setShowForm(true);
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(s._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No student records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
    