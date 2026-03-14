import { useState, useEffect } from "react";
import axios from "axios";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {

  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

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

  const deleteTodo = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/todos/${id}`
      );

      setTodos((prev) =>
        prev.filter((todo) => todo.id !== id)
      );

    } catch (error) {

      console.error(error);

    }

  };

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

  return (

    <div className="app-container">

      <h1 className="title">Todo App</h1>

      <TodoForm
        title={title}
        setTitle={setTitle}
        addTodo={addTodo}
      />

      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        updateTodo={updateTodo}
      />

    </div>

  );

}

export default App;