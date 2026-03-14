function TodoForm({ title, setTitle, addTodo }) {

  return (
    <div className="form">

      <input
        className="todo-input"
        type="text"
        placeholder="Enter todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className="add-btn" onClick={addTodo}>
        Add
      </button>

    </div>
  );

}

export default TodoForm;