import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTodo, toggleTodo, updateTodo, setTodos }) {

  const handleDragEnd = (result) => {

    if (!result.destination) return;

    const items = Array.from(todos);
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    setTodos(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>

      <Droppable droppableId="todos">
        {(provided) => (
          <div
            className="todo-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >

            {todos.map((todo, index) => (

              <Draggable
                key={todo.id.toString()}
                draggableId={todo.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style
                    }}
                  >

                    <TodoItem
                      todo={todo}
                      deleteTodo={deleteTodo}
                      toggleTodo={toggleTodo}
                      updateTodo={updateTodo}
                    />

                  </div>
                )}
              </Draggable>

            ))}

            {provided.placeholder}

          </div>
        )}
      </Droppable>

    </DragDropContext>
  );
}

export default TodoList;