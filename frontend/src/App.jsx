import { useState, useEffect } from "react";
import axios from "axios";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {

  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // Filter logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos");
      setTodos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!title.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/todos",
        { title }
      );

      setTodos((prev) => [...prev, res.data]);
      setTitle("");

    } catch (error) {
      console.error(error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);

      setTodos((prev) =>
        prev.filter((todo) => todo.id !== id)
      );

    } catch (error) {
      console.error(error);
    }
  };

  // Toggle complete
  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { completed }
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? res.data : todo
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  // Update title
  const updateTodo = async (id, title) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/todos/title/${id}`,
        { title }
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? res.data : todo
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  // Clear completed
  const clearCompleted = async () => {
    try {

      const completedTodos = todos.filter(t => t.completed);

      for (let todo of completedTodos) {
        await axios.delete(`http://localhost:5000/api/todos/${todo.id}`);
      }

      setTodos((prev) => prev.filter(t => !t.completed));

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="app-container">

      <h1 className="title">Todo App</h1>

      <TodoForm
        title={title}
        setTitle={setTitle}
        addTodo={addTodo}
      />

      {/* FILTER BUTTONS */}
      <div className="filters">

        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

      </div>

      {/* COUNTER */}
      <p className="counter">
        {todos.filter(todo => !todo.completed).length} tasks left
      </p>

      <TodoList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        updateTodo={updateTodo}
        setTodos={setTodos}
      />

      {/* CLEAR COMPLETED */}
      <button className="clear-btn" onClick={clearCompleted}>
        Clear Completed
      </button>

    </div>

  );

}

export default App;