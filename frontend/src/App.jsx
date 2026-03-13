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

      await axios.post("http://localhost:5000/api/todos", {
        title: title
      });

      setTitle("");

      fetchTodos();

    } catch (error) {

      console.error(error);

    }

  };

  const deleteTodo = async (id) => {

  try {

    await axios.delete(`http://localhost:5000/api/todos/${id}`);

    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );

  } catch (error) {

    console.error(error);

  }

};

  return (

    <div>

      <h1>Todo App</h1>

      <TodoForm
        title={title}
        setTitle={setTitle}
        addTodo={addTodo}
      />

      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
      />

    </div>

  );

}

export default App;