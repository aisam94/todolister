import { FormEvent, useState } from "react";
import { nanoid } from "nanoid";
import { doc, setDoc } from "firebase/firestore";
import { DocumentData } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import TodoItem from "./TodoItem";

interface todoProps {
  todoData: DocumentData[] | undefined;
}

interface newItemType {
  text: string;
  checked: boolean;
  id: string;
  isEditing: boolean;
}

const Todo = ({ todoData = [] }: todoProps) => {
  const [user] = useAuthState(auth);
  const [todoinput, setFormData] = useState("");
  const [todoList, setTodoData] = useState(todoData);

  const change = (event: { target: HTMLInputElement }) => {
    setFormData(event.target.value);
  };

  const addTodo = (event: FormEvent) => {
    event.preventDefault();
    const text = todoinput.trim();
    let newItem: newItemType;
    if (text !== "") {
      // if text is not empty create new item obj
      newItem = {
        text: text,
        checked: false,
        id: nanoid(),
        isEditing: false,
      };
      // add item obj to todo list and empty form
      setTodoData([...todoList, newItem]);
      setFormData("");
    }
    // const newList = [...todoList, newItem];
    const newList = [...todoList];
    updateList(newList);
  };

  const updateList = (newList: DocumentData[]) => {
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
