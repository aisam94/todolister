import { useState } from "react";

const Todo = () => {
  const [todoinput, setFormData] = useState("");
  const [todoList, setTodoData] = useState([]);

  const change = (event) => {
    setFormData(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    const text = todoinput.trim();
    if (text !== "") {
      const todoItem = {
        text: text,
        checked: false,
        id: Date.now(),
      };
      setTodoData([...todoList, todoItem]);
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
    console.log({ todoList });
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <form className="todo-form" onSubmit={(event) => submit(event)}>
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
              <span className="todo-item-text">{item.text}</span>
              <div className="todo-item-btn">
                <button id={item.id} className="btn btn-edit-todo"></button>
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
