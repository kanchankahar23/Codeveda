import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskManager.css'; 

const API_BASE = 'http://localhost:5000/api/tasks';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or Update Task
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingTaskId) {
      // Update existing task
      await axios.put(`${API_BASE}/${editingTaskId}`, {
        title: formData.title,
        description: formData.description
      });
    } else {
      // Create new task
      await axios.post(API_BASE, {
        title: formData.title,
        description: formData.description
      });
    }

    setFormData({ title: '', description: '' });
    setEditingTaskId(null); 
    fetchTasks(); 
  } catch (err) {
    console.error("Error creating/updating task", err.response?.data || err.message);
    alert(err.response?.data?.message || "Error creating/updating task");
  }
};


  // Edit Task
  const handleEdit = (task) => {
    console.log("kanchan")
    setFormData({ title: task.title, description: task.description });
    setEditingTaskId(task._id);
  };

  // Delete Task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">{editingTaskId ? 'Update' : 'Add'} Task</button>
      </form>

      <div className="task-list">
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <span>{task.title}</span>: {task.description}
              <div>
                <button className="edit-btn" onClick={() => handleEdit(task)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskManager;
