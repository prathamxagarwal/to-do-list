import { useEffect, useState } from "react";
import "./App.css";

const API = "https://to-do-list-vr11.onrender.com"; // change if needed

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Fetch todos
  const getTodos = async () => {
    try {
      const res = await fetch(`${API}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!text.trim()) return;

    await fetch(`${API}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setText("");
    getTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`${API}/todos/${id}`, {
      method: "DELETE",
    });
    getTodos();
  };

  return (
    <div className="container">
      <h1>✨ Todo App</h1>

      <div className="input-box">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;