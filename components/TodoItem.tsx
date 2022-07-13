import React, {
  useState,
  MouseEvent,
  ChangeEvent,
  SetStateAction,
} from "react";
import { DocumentData } from "@firebase/firestore";

interface todoItemProps {
  item: DocumentData;
  todoList: DocumentData[];
  setTodoData: React.Dispatch<SetStateAction<DocumentData[]>>;
  updateList: (newList: DocumentData[]) => void;
}

const TodoItem = ({
  item,
  todoList,
  setTodoData,
  updateList,
}: todoItemProps) => {
  const [todoinput2, setFormData2] = useState("");

  const toggleCheckbox = (event: { target: HTMLInputElement }) => {
    const id = event.target.getAttribute("id");
    const item: DocumentData | undefined = todoList.find(
      (item) => item.id === id
    );
    if (!item) return;
    item.checked = !item.checked;
    setTodoData([...todoList]);
    updateList(todoList);
  };

  const editTodo = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = event.target.getAttribute("id");
    let text = todoinput2.trim();
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

  const change2 = (event: { target: HTMLInputElement }) => {
    setFormData2(event.target.value);
  };

  const toggleEdit = (event: MouseEvent) => {
    const el = event.target as HTMLInputElement;
    const id = el.getAttribute("id");
    const item = todoList.find((item) => item.id === id);
    if (!item) return;
    item.isEditing = !item.isEditing;
    setTodoData([...todoList]);
  };

  const deleteTodo = (event: MouseEvent) => {
    const el = event.target as HTMLInputElement;
    const id = el.getAttribute("id");
    const newList = todoList.filter((item) => item.id !== id);
    setTodoData(todoList.filter((item) => item.id !== id));
    updateList(newList);
  };

  return (
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
  );
};

export default TodoItem;
