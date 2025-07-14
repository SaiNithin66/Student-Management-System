export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <ul className="student-list">
      {students.map((s) => (
        <li key={s._id}>
          <span>
            {s.name} | {s.roll} | 📧 {s.email} | 📱 {s.mobile} | Avg: {s.average}
          </span>
          <button onClick={() => onEdit(s)}>Edit</button>
          <button className="delete" onClick={() => onDelete(s._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
