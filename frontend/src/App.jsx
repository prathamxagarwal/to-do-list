import { useEffect, useState } from "react";

const API_URL = "https://to-do-list-vr11.onrender.com/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const getTodos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!text) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    setText("");
    getTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todo App</h1>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo..."
        />
        <button style={styles.addBtn} onClick={addTodo}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.todo}>
            {todo.text}
            <button
              style={styles.deleteBtn}
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial"
  },
  title: {
    marginBottom: "20px"
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  },
  input: {
    padding: "10px",
    width: "70%",
    borderRadius: "5px",
    border: "1px solid gray"
  },
  addBtn: {
    padding: "10px 15px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "5px"
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px"
  },
  todo: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd"
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px"
  }
};

export default App;