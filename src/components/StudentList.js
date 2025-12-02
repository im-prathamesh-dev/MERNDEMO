import React from 'react';

export default function StudentList({ students = [], onEdit, onDelete }) {
  if (!students.length) return <p>No students yet.</p>;
  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th><th>Email</th><th>Roll</th><th>Course</th><th>Year</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(s => (
          <tr key={s._id}>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>{s.rollNo}</td>
            <td>{s.course}</td>
            <td>{s.year}</td>
            <td>
              <button onClick={() => onEdit(s)}>Edit</button>
              <button onClick={() => onDelete(s._id)} style={{ marginLeft: 8 }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
