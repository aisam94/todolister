import React, { useState, MouseEvent, SetStateAction } from "react";
import { DocumentData, Timestamp } from "@firebase/firestore";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

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

  const editTodo = (value: string, id: string) => {
    let text = value.trim();
    const editedTodo = todoList.map((item) => {
      if (id === item.id) {
        text = text !== "" ? text : item.text;
        return { ...item, text: text, updatedAt: Timestamp.now() };
      }
      return item;
    });
    setTodoData(editedTodo);
    setFormData2("");
    updateList(editedTodo);
  };

  const deleteTodo = (event: MouseEvent) => {
    const el = event.target as HTMLInputElement;
    const id = el.getAttribute("id");
    const newList = todoList.filter((item) => item.id !== id);
    setTodoData(todoList.filter((item) => item.id !== id));
    updateList(newList);
  };

  return (
    <li className="flex items-center max-w-full min-w-0" key={item.id}>
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
          onSubmit={(e) => editTodo(e, item.id)}
          marginRight={2}
          className="flex items-center"
        >
          <EditablePreview
            className="truncate"
            style={{
              textDecoration: item.checked ? "line-through" : "none",
            }}
          />
          <EditableInput className="p-1" />
        </Editable>
      </div>

      <ButtonGroup className="" variant="solid" spacing={4} alignItems="center">
        <Button colorScheme="red" id={item.id} onClick={deleteTodo}>
          <img className="h-5 w-5" src="/x.svg" />
        </Button>
      </ButtonGroup>
    </li>
  );
};

export default TodoItem;
