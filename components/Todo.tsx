import { FormEvent, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { doc, setDoc } from "firebase/firestore";
import { DocumentData } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import TodoItem from "./TodoItem";
import {
  Box,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

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
  const [todoList, setTodoData] = useState<DocumentData[]>([]);

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

  useEffect(() => {
    setTodoData(todoData);
  }, []);

  return (
    <Box className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <div className="flex w-full">
        <form className="todo-form flex items-center" onSubmit={addTodo}>
          <Input
            autoFocus
            type="text"
            placeholder="Enter new item here.."
            value={todoinput}
            onChange={change}
            backgroundColor="white"
            borderRadius="10px"
            borderColor="#333"
            borderWidth="2px"
          />
        </form>
        <Popover placement="right">
          <PopoverTrigger>
            <button className="ml-2">
              <img
                className="w-5 h-5 cursor-pointer hover:scale-110"
                src="/info-circle.svg"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow bgColor={"#333"} />
            <PopoverCloseButton textColor="whiteAlpha.50" />
            <PopoverHeader className="text-white bg-secondary flex justify-center">
              Information
            </PopoverHeader>
            <PopoverBody className="text-white bg-secondary">
              <li className="ml-2">
                Add new todo item by writing inside the input.
              </li>
              <li className="ml-2">
                You can edit the item by clicking the text itself.
              </li>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
      {/* Incomplete item list*/}
      {todoList.length !== 0 && (
        <Box className="uppercase bg-secondary text-white font-bold py-1 px-3">
          incomplete
        </Box>
      )}
      <ul className="todo-list">
        {todoList.map((item, index) => {
          return (
            !item.checked && (
              <TodoItem
                key={index}
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
        <Box className="uppercase bg-secondary text-white font-bold py-1 px-3">
          completed
        </Box>
      )}
      <ul className="todo-list">
        {todoList.map((item) => {
          return (
            item.checked && (
              <TodoItem
                key={item.id}
                item={item}
                todoList={todoList}
                setTodoData={setTodoData}
                updateList={updateList}
              />
            )
          );
        })}
      </ul>
    </Box>
  );
};

export default Todo;
