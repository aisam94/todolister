import { useState } from "react";
import { nanoid } from "nanoid";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import TodoItem from "../components/TodoItem";

const Todo = ({ todoData = [] }) => {
  const [user] = useAuthState(auth);
  const [todoinput, setFormData] = useState("");
  const [todoList, setTodoData] = useState(todoData);

  const change = (event) => {
    setFormData(event.target.value);
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
      {todoList.length !== 0 && (
        <div className="todo-status-text">Incomplete</div>
      )}
      <ul className="todo-list">
        {todoList.map((item) => {
          return (
            !item.checked && (
              <TodoItem
                item={item}
                todoList={todoList}
                setTodoData={setTodoData}
                updateList={updateList}
              />
            )
          );
        })}
      </ul>
      {/* Completed item list*/}

      {todoList.length !== 0 && (
        <div className="todo-status-text">Completed</div>
      )}
      <ul className="todo-list">
        {todoList.map((item) => {
          return (
            item.checked && (
              <TodoItem
                item={item}
                todoList={todoList}
                setTodoData={setTodoData}
                updateList={updateList}
              />
            )
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
