import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { getStudents, createStudent, updateStudent, deleteStudent } from './api/api';

function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Error fetching students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleAdd = async (data) => {
    try {
      const res = await createStudent(data);
      setStudents(prev => [res.data, ...prev]);
      setMessage('Student added');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Error adding student');
    }
  };

  const handleEdit = (student) => setEditing(student);

  const handleUpdate = async (data) => {
    try {
      const res = await updateStudent(editing._id, data);
      setStudents(prev => prev.map(s => s._id === res.data._id ? res.data : s));
      setEditing(null);
      setMessage('Student updated');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Error updating student');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await deleteStudent(id);
      setStudents(prev => prev.filter(s => s._id !== id));
      setMessage('Student deleted');
    } catch (err) {
      console.error(err);
      setMessage('Error deleting student');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Student Registration</h1>
      {message && <div style={{ marginBottom: 10 }}>{message}</div>}
      <div style={{ display: 'flex', gap: 40 }}>
        <div>
          <h2>{editing ? 'Edit Student' : 'Register Student'}</h2>
          <StudentForm
            initial={editing || {}}
            submitText={editing ? 'Update Student' : 'Add Student'}
            onSubmit={editing ? handleUpdate : handleAdd}
          />
          {editing && <button onClick={() => setEditing(null)} style={{ marginTop: 8 }}>Cancel</button>}
        </div>
        <div style={{ flex: 1 }}>
          <h2>Students {loading && ' (loading...)'}</h2>
          <StudentList students={students} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;
