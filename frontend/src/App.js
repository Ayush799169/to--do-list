
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API = process.env.REACT_APP_API_URL;

   //states
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //load task
  useEffect(() => {
    fetchTasks();
  },[]);

 //get all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const res = await axios.get(`${API}/api/tasks`);
      setTasks(res.data);
    } catch (err) {
      setError("fail to load tasks");
    } finally {
      setLoading(false);
    }
  };

  //add new task 
  const saveTask = async () => {
    if (!title.trim()) {
      setError("please enter task");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editId) {
        await axios.put(`${API}/api/tasks/${editId}`, { title });
        setSuccess("Task updated!");
        setEditId(null);
      } 
      else {
        await axios.post(`${API}/api/tasks`, { title });
        setSuccess("Task added!");
      }

      setTitle("");
      fetchTasks();
    } catch (err) {
      setError("something went wrong, ");
    } finally {
      setLoading(false);
    }
  };

  // task delete 
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await axios.delete(`${API}/api/tasks/${id}`);
      setSuccess("Task deleted!");
      fetchTasks();
    } catch (err) {
      setError("something went wrong, try again");
    } finally {
      setLoading(false);
    }
  };

  const editTask = (task) => {
    setTitle(task.title);
    setEditId(task._id);
    setError("");
    setSuccess("");
  };

  // task complete or incomplete toggle
  const ToggleTaskStatus = async (id) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await axios.put(`${API}/api/tasks/status/${id}`);
      setSuccess("Status updated!");
      fetchTasks();
    } catch (err) {
      setError("Status update fail, try again");
    } finally {
      setLoading(false);
    }
  };

  // search task
  const Searchtasks = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (!search.trim()) {
        fetchTasks();
        return;
      }

      const res = await axios.get(`${API}/api/tasks/search?q=${search}`);
      setTasks(res.data);
    } catch (err) {
      setError("Search faild");
    } finally {
      setLoading(false);
    }
  };

  // clear all inputs fields 
  const clearData = () => {
    setTitle("");
    setSearch("");
    setEditId(null);
    setError("");
    setSuccess("");
    fetchTasks();
  };

  return (
    <div className="container">
      <div className="todo-box">
        <h1>Todo List</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={saveTask}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Search task"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={Searchtasks}>Search</button>
          <button onClick={clearData}>Clear</button>
        </div>

        {loading && <p className="info">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => ToggleTaskStatus(task._id)}
                />
                <span className={task.completed ? "completed" : ""}>
                  {task.title}
                </span>
              </div>

              <div className="task-buttons">
                <button onClick={() => editTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;