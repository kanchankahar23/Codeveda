import React, { useState } from 'react';
import API from '../api';

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState('');

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await API.post('/api/tasks', { title });
    setTitle('');
    fetchTasks();
  };

  return (
    <form onSubmit={addTask}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task" />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
