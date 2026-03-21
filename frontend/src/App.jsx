import { useEffect, useState } from "react";

const API_URL = "https://to-do-list-vr1l.onrender.com/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Get all todos
  const getTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Add todo
  const addTodo = async () => {
    if (!text) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      setText("");
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  // Load todos on page load
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Todo App</h1>

      <input
        type="text"
        placeholder="Enter todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: "10px" }}>
            {todo.text}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;