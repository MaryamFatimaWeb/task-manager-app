import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const API = "http://localhost:5000/api/tasks";

  // GET TASKS
  const getTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  };

  // LOAD TASKS ON PAGE LOAD
  useEffect(() => {
    getTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    if (!task.trim()) return;

    try {
      await axios.post(API, { title: task });
      setTask("");
      getTasks();
    } catch (err) {
      console.log("Error adding task:", err);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getTasks();
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  return (
    <div className="container">
      
      {/* HEADER */}
      <header className="header">
        <h1 className="logo">📋 Task Manager</h1>

        <div>
          <button className="nav-btn">Home</button>
          <button className="nav-btn">Tasks</button>
          <button className="nav-btn">About</button>
        </div>
      </header>

      {/* TITLE */}
      <h2>Manage Your Daily Tasks</h2>

      {/* INPUT */}
      <div className="input-section">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      {/* STATS */}
      <div className="stats">
        <p>Total Tasks: {tasks.length}</p>
      </div>

      {/* TASK LIST */}
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.title}
            <button onClick={() => deleteTask(t._id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Task Manager App</p>
      </footer>

    </div>
  );
}

export default App;