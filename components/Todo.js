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

  const deleteTodo = (e) => {
    const id = e.target.getAttribute("id");
    setTodoData(todoList.filter((item) => item.id !== Number(id)));
  };

  return (
    <div class="todo-container">
      <h1 id="todo-title">Todo List</h1>
      <form id="todo-form" onSubmit={(event) => submit(event)}>
        <input
          autofocus
          type="text"
          aria-label="Enter new item"
          placeholder="Enter new item here..."
          id="todo-input"
          value={todoinput}
          onChange={(event) => change(event)}
        />
      </form>
      <ul id="todo-list">
        {todoList.map((item) => {
          return (
            <li data-key={item.id}>
              <input id={item.id} class="checkbox" type="checkbox" />
              <label for={item.id} class="tick"></label>
              <span class="todo-item-text">{item.text}</span>
              <button class="btn-edit-todo"></button>
              <button
                id={item.id}
                class="btn-delete-todo"
                onClick={deleteTodo}
              ></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
