import { useState } from "react";

function TodoItem({ todo, deleteTodo, toggleTodo, updateTodo }) {

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.title);

  const handleUpdate = () => {
    if (!text.trim()) return; 

    updateTodo(todo.id, text);
    setEditing(false);

  };

  return (
    <div className="todo-item">

      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id, !todo.completed)}
      />

      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <span className={todo.completed ? "completed" : ""}>
          {todo.title}
        </span>
      )}

      {editing ? (
        <button onClick={handleUpdate}>
          Save
        </button>
      ) : (
        <button onClick={() => setEditing(true)}>
          Edit
        </button>
      )}

      <button
        className="delete-btn"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>

    </div>
  );

}

export default TodoItem;