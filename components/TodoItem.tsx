import React, { useState, MouseEvent, SetStateAction, Dispatch } from "react";
import { DocumentData, Timestamp } from "@firebase/firestore";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { TodoItem as TodoItemType } from "../types/todo";

interface todoItemProps {
  item: DocumentData;
  todoList: TodoItemType[];
  setTodoList: React.Dispatch<SetStateAction<TodoItemType[]>>;
  updateList: (newList: DocumentData[]) => void;
  currentDrawerId?: string;
  setCurrentDrawerId: Dispatch<SetStateAction<string | undefined>>;
}

const TodoItem = ({
  item,
  todoList,
  setTodoList,
  updateList,
  currentDrawerId,
  setCurrentDrawerId,
}: todoItemProps) => {
  const toggleCheckbox = () => {
    const id = item.id;
    const editedTodo = todoList.map((item) => {
      if (id === item.id) {
        item.checked = !item.checked;
        item.updatedAt = Timestamp.now();
      }
      return item;
    });
    setTodoList(editedTodo);
    updateList(editedTodo);
  };

  const editTodo = (value: string) => {
    const id = item.id;
    let text = value.trim();
    const editedTodo = todoList.map((item) => {
      if (id === item.id) {
        text = text !== "" ? text : item.text;
        return { ...item, text: text, updatedAt: Timestamp.now() };
      }
      return item;
    });
    setTodoList(editedTodo);
    updateList(editedTodo);
  };

  const deleteTodo = () => {
    const id = item.id;
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
    updateList(newList);
  };

  function handleShowDrawer() {
    setCurrentDrawerId(item.id);
  }

  return (
    <li
      className={`flex items-center max-w-full min-w-0 ${
        currentDrawerId === item.id && "bg-accent-focus"
      }`}
      key={item.id}
    >
      <Checkbox
        isChecked={item.checked}
        marginRight="3"
        colorScheme="red"
        id={item.id}
        onChange={toggleCheckbox}
        borderColor="black"
        size="lg"
      ></Checkbox>
      <div className="text-left flex-1 min-w-0">
        <Editable
          defaultValue={item.text}
          onSubmit={(e) => editTodo(e)}
          marginRight={2}
          className="flex items-center"
        >
          <EditablePreview
            className="truncate"
            style={{
              textDecoration: item.checked ? "line-through" : "none",
            }}
          />
          <EditableInput bgColor={"white"} className="p-1 bg-white" />
        </Editable>
      </div>
      <ButtonGroup className="" variant="solid" spacing={4} alignItems="center">
        <Button
          padding={"0"}
          colorScheme="blue"
          id={item.id}
          onClick={handleShowDrawer}
        >
          <img className="h-5 w-5" src="/more-vertical-svgrepo-com.svg" />
        </Button>
        <Button padding="0" colorScheme="red" id={item.id} onClick={deleteTodo}>
          <img className="h-5 w-5" src="/x.svg" />
        </Button>
      </ButtonGroup>
    </li>
  );
};

export default TodoItem;
