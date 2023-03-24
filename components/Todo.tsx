import { FormEvent, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { doc, setDoc } from "firebase/firestore";
import { DocumentData, Timestamp } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import TodoItem from "./TodoItem";
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { TodoItem as TodoItemType } from "../types/todo";
import TodoItemDrawer from "./TodoItemDrawer";

interface todoProps {
  todoData: TodoItemType[] | undefined;
}

const Todo = ({ todoData = [] }: todoProps) => {
  const [user] = useAuthState(auth);
  const [todoinput, setFormData] = useState("");
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const [currentDrawerId, setCurrentDrawerId] = useState<string | undefined>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const change = (event: { target: HTMLInputElement }) => {
    setFormData(event.target.value);
  };

  function getTodoItem(id: string | undefined) {
    if (!id) return;
    return todoList.find((e) => e.id === id);
  }

  const addTodo = (event: FormEvent) => {
    event.preventDefault();
    const text = todoinput.trim();
    let newItem: TodoItemType;

    if (text === "") return; // only create new todo if text is not empty
    // maybe need to check if id is already created
    newItem = {
      id: nanoid(),
      text: text,
      checked: false,
      createdAt: Timestamp.now(),
    };

    // add item obj to todo list and empties form
    setTodoList([...todoList, newItem]);
    setFormData("");
    const newList = [...todoList, newItem];
    updateList(newList);
  };

  const updateList = (newList: DocumentData[]) => {
    if (user) {
      setDoc(doc(db, "notes", user.uid), { todo: newList }, { merge: true });
    }
  };

  useEffect(() => {
    setTodoList(todoData);
  }, []);

  return (
    <div className="w-full flex justify-center relative">
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
                  You may edit the item by clicking the text itself.
                </li>
                <li className="ml-2">
                  You may also edit details such as due date, priority, etc in
                  the section provided.
                </li>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
        {/* Incomplete item list*/}
        {todoList.length !== 0 && (
          <Box className="uppercase bg-secondary text-white font-bold py-1 px-3 my-1">
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
                  setTodoList={setTodoList}
                  updateList={updateList}
                  currentDrawerId={currentDrawerId}
                  setCurrentDrawerId={setCurrentDrawerId}
                  onOpen={onOpen}
                />
              )
            );
          })}
        </ul>

        {/* Completed item list*/}
        {todoList.length !== 0 && (
          <Box className="uppercase bg-secondary text-white font-bold py-1 px-3 my-1">
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
                  setTodoList={setTodoList}
                  updateList={updateList}
                  currentDrawerId={currentDrawerId}
                  setCurrentDrawerId={setCurrentDrawerId}
                  onOpen={onOpen}
                />
              )
            );
          })}
        </ul>
      </Box>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        size={windowSize.current[0] > 500 ? "sm" : "full"}
      >
        <DrawerContent>
          <DrawerCloseButton />
          <TodoItemDrawer
            todo={getTodoItem(currentDrawerId)}
            todoList={todoList}
            setTodoList={setTodoList}
            updateList={updateList}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Todo;
