import { useState, useEffect } from "react";
import axios from "axios";

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

  const deleteTodo=async(id)=>{
    try{
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchTodos();
    }catch(error){
      console.error(error);
    }
  };

  return (
    <div>

      <h1>Todo App</h1>

      <input
        type="text"
        placeholder="Enter todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.title}
          <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}

    </div>
  );

}

export default App;