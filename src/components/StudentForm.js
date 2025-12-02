import React, { useState, useEffect } from 'react';

export default function StudentForm({ onSubmit, initial = {}, submitText = 'Add Student' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    rollNo: '',
    course: '',
    year: 1,
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (initial && Object.keys(initial).length) setForm({ ...form, ...initial });
    // eslint-disable-next-line
  }, [initial]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    // don't clear in edit mode (caller can clear)
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
      <div>
        <label>Name</label><br/>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label><br/>
        <input name="email" value={form.email} onChange={handleChange} required type="email" />
      </div>
      <div>
        <label>Roll No</label><br/>
        <input name="rollNo" value={form.rollNo} onChange={handleChange} required />
      </div>
      <div>
        <label>Course</label><br/>
        <input name="course" value={form.course} onChange={handleChange} required />
      </div>
      <div>
        <label>Year</label><br/>
        <input name="year" type="number" min="1" max="10" value={form.year} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone</label><br/>
        <input name="phone" value={form.phone} onChange={handleChange} />
      </div>
      <div>
        <label>Address</label><br/>
        <textarea name="address" value={form.address} onChange={handleChange} />
      </div>
      <button type="submit">{submitText}</button>
    </form>
  );
}
