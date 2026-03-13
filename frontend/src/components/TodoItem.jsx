function TodoItem({ todo , deleteTodo}){
    return (
        <div>
            {todo.title}

            <button onClick={()=> deleteTodo(todo.id)}>
                Delete
            </button>
        </div>
    );
}

export default TodoItem;