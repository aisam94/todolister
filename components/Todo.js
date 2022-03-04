import { useState } from "react";
import { nanoid } from "nanoid";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

const Todo = ({ todoData = [] }) => {
  const [user] = useAuthState(auth);
  const [todoinput, setFormData] = useState("");
  const [todoinput2, setFormData2] = useState("");
  const [todoList, setTodoData] = useState(todoData);

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
        id: nanoid(),
        isEditing: false,
      };

      setTodoData([...todoList, newItem]);
      setFormData("");
    }
    const newList = [...todoList, newItem];
    updateList(newList);
  };

  const deleteTodo = (event) => {
    const id = event.target.getAttribute("id");
    const newList = todoList.filter((item) => item.id !== id);
    setTodoData(todoList.filter((item) => item.id !== id));
    updateList(newList);
  };

  const toggleCheckbox = (event) => {
    const id = event.target.getAttribute("id");
    const item = todoList.find((item) => item.id === id);
    item.checked = !item.checked;
    setTodoData([...todoList]);
    updateList(todoList);
  };

  const editTodo = (event) => {
    event.preventDefault();
    const id = event.target.getAttribute("id");
    const text = todoinput2.trim();
    const editedTodo = todoList.map((item) => {
      if (id === item.id) {
        text = text !== "" ? text : item.text;
        return { ...item, text: text, isEditing: false };
      }
      return item;
    });
    setTodoData(editedTodo);
    setFormData2("");

    updateList(editedTodo);
  };

  const toggleEdit = (event) => {
    const id = event.target.getAttribute("id");
    const item = todoList.find((item) => item.id === id);
    item.isEditing = !item.isEditing;
    setTodoData([...todoList]);
  };

  const updateList = (newList) => {
    if (user) {
      setDoc(doc(db, "notes", user.uid), { todo: newList }, { merge: true });
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <form className="todo-form" onSubmit={addTodo}>
        <input
          autoFocus
          type="text"
          aria-label="Enter new item"
          placeholder="Enter new item here..."
          className="todo-input"
          value={todoinput}
          onChange={change}
        />
      </form>
      {/* Incomplete item list*/}
      <div className="todo-status-text">Incomplete</div>
      <ul className="todo-list">
        {todoList.map((item) => {
          return (
            !item.checked && (
              <li key={item.id}>
                <input
                  id={item.id}
                  className="checkbox"
                  type="checkbox"
                  checked={item.checked}
                  onChange={toggleCheckbox}
                />
                <label htmlFor={item.id} className="tick"></label>
                {/* Edit mode or normal mode */}
                {!item.isEditing ? (
                  <span
                    className="todo-item-text"
                    style={{
                      textDecoration: item.checked ? "line-through" : "none",
                    }}
                  >
                    {item.text}
                  </span>
                ) : (
                  <form id={item.id} className="edit-form" onSubmit={editTodo}>
                    <input
                      type="text"
                      className="edit-input-form"
                      value={todoinput2}
                      onChange={change2}
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
            )
          );
        })}
      </ul>
      {/* Completed item list*/}
      <div className="todo-status-text">Completed</div>
      <ul className="todo-list">
        {todoList.map((item) => {
          return (
            item.checked && (
              <li key={item.id}>
                <input
                  id={item.id}
                  className="checkbox"
                  type="checkbox"
                  checked={item.checked}
                  onChange={toggleCheckbox}
                />
                <label htmlFor={item.id} className="tick"></label>
                {/* Edit mode or normal mode */}
                {!item.isEditing ? (
                  <span
                    className="todo-item-text"
                    style={{
                      textDecoration: item.checked ? "line-through" : "none",
                    }}
                  >
                    {item.text}
                  </span>
                ) : (
                  <form id={item.id} className="edit-form" onSubmit={editTodo}>
                    <input
                      type="text"
                      className="edit-input-form"
                      value={todoinput2}
                      onChange={change2}
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
            )
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
