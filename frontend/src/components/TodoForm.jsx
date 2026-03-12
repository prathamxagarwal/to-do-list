function Todoform({title,setTitle, addTodo}){
    return (
        <div>
            <input
                type="text"
                placeholder="Enter todo"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}

            />
            <button onClick={addTodo}>Add</button>
        </div>
    );
}

export default TodoForm;