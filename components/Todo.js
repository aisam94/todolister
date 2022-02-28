import { useState } from "react";
import { nanoid } from "nanoid";

const Todo = () => {
  const [todoinput, setFormData] = useState("");
  const [todoinput2, setFormData2] = useState("");
  const [todoList, setTodoData] = useState([]);

  const change = (event) => {
    setFormData(event.target.value);
  };

  const change2 = (event) => {
    setFormData2(event.target.value);
  };

  const addTodo = (event) => {
    event.preventDefault();
    const text = todoinput.trim();
    if (text !== "") {
      const newItem = {
        text: text,
        checked: false,
        id: Date.now(),
        isEditing: false,
        // id: nanoid(),
      };
      setTodoData([...todoList, newItem]);
      setFormData("");
    }
  };

  const deleteTodo = (event) => {
    const id = event.target.getAttribute("id");
    setTodoData(todoList.filter((item) => item.id !== Number(id)));
  };

  const toggleItem = (event) => {
    const id = event.target.getAttribute("id");
    const item = todoList.find((item) => item.id === Number(id));
    item.checked = !item.checked;
    setTodoData([...todoList]);

    const todoItem = document.querySelector(`[data-key='${id}']`);
    if (item.checked) {
      todoItem.style.textDecoration = "line-through";
    } else {
      todoItem.style.textDecoration = "none";
    }
  };

  const editTodo = (event) => {
    event.preventDefault();
    const id = event.target.getAttribute("id");
    const text = todoinput2.trim();
    const editedTodo = todoList.map((item) => {
      if (Number(id) === item.id) {
        return { ...item, text: text };
      }
      return item;
    });
    console.log({ id, editedTodo });
    setTodoData(editedTodo);
    setFormData2("");
  };

  const toggleEdit = (event) => {
    const id = event.target.getAttribute("id");
    const item = todoList.find((item) => item.id === Number(id));
    item.isEditing = !item.isEditing;
    setTodoData([...todoList]);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <form className="todo-form" onSubmit={(event) => addTodo(event)}>
        <input
          autoFocus
          type="text"
          aria-label="Enter new item"
          placeholder="Enter new item here..."
          className="todo-input"
          value={todoinput}
          onChange={(event) => change(event)}
        />
      </form>
      <ul className="todo-list">
        {/* iterate todo list and create them one by one  */}
        {todoList.map((item) => {
          return (
            <li key={item.id} data-key={item.id}>
              <input
                id={item.id}
                className="checkbox"
                type="checkbox"
                checked={item.checked}
                onChange={toggleItem}
              />
              <label htmlFor={item.id} className="tick"></label>
              {/* replace span with input for editing */}
              {!item.isEditing && (
                <span className="todo-item-text">{item.text}</span>
              )}
              {item.isEditing && (
                <form id={item.id} class="edit-form" onSubmit={editTodo}>
                  <input
                    type="text"
                    className="edit-input-form"
                    value={todoinput2}
                    onChange={(event) => change2(event)}
                  />
                </form>
              )}
              <div className="todo-item-btn">
                <button
                  id={item.id}
                  className="btn btn-edit-todo"
                  onClick={toggleEdit}
                ></button>
                <button
                  id={item.id}
                  className="btn btn-delete-todo"
                  onClick={deleteTodo}
                ></button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
