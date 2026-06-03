import { useState } from "react";
import "./App.css";

function App() {
  // State management
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // 1. CREATE: Add a new task
  const addTodo = (e) => {
    e.preventDefault();
    if (!task.trim()) return; // Prevent empty tasks

    const newTodo = {
      id: Date.now(),
      text: task,
    };

    setTodos([...todos, newTodo]);
    setTask(""); // Clear input
  };

  // 2. DELETE: Remove a task
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 3. UPDATE: Enter edit mode
  const startEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  // 3. UPDATE: Save the edited task
  const saveEdit = (id) => {
    if (!editText.trim()) return;

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo,
      ),
    );
    setEditingId(null); // Exit edit mode
    setEditText("");
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      {/* Input Form */}
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.length === 0 ? <p>No tasks yet. Add one above!</p> : null}

        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              /* Inline Editing Mode */
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)} className="save-btn">
                  Save
                </button>
              </>
            ) : (
              /* Normal View Mode */
              <>
                <span>{todo.text}</span>
                <div className="actions">
                  <button
                    onClick={() => startEdit(todo.id, todo.text)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
