import {
  Divider,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TodoItem as TodoItemType } from "../types/todo";

type TodoItemDrawerProps = {
  todo: any;
  updateList: any;
  todoList: TodoItemType[];
  setTodoList: any;
};

const TodoItemDrawer = ({
  todo = {},
  updateList,
  todoList,
  setTodoList,
}: TodoItemDrawerProps) => {
  const [dueDate, setDueDate] = useState<string | undefined>(); // eg: date -> 2023-04-05
  const [priority, setPriority] = useState("none");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[] | undefined>([]);
  const [inputTag, setInputTag] = useState("");

  function handlePriority(priority: string) {
    // setPriority(priority);

    const editedTodo = todoList.map((item: TodoItemType) => {
      if (todo.id === item.id) {
        return { ...item, priority: priority, updatedAt: Timestamp.now() };
      }
      return item;
    });
    setTodoList(editedTodo);
    updateList(editedTodo);
  }

  function handleDescription(value: string) {
    const description = value;
    setDescription(description);

    const editedTodo = todoList.map((item: TodoItemType) => {
      if (todo.id === item.id) {
        return {
          ...item,
          description: description,
          updatedAt: Timestamp.now(),
        };
      }
      return item;
    });
    setTodoList(editedTodo);
    updateList(editedTodo);
  }

  function addTags(e: any) {
    e.preventDefault();
    let currentTags: string[];
    if (!tags) {
      currentTags = [];
    } else {
      currentTags = tags;
    }
    const newTags = [...currentTags, inputTag];
    setTags(newTags);
    setInputTag("");

    const editedTodo = todoList.map((item: TodoItemType) => {
      if (todo.id === item.id) {
        return {
          ...item,
          tags: newTags,
          updatedAt: Timestamp.now(),
        };
      }
      return item;
    });
    setTodoList(editedTodo);
    updateList(editedTodo);
  }

  function handleInputTag(value: string) {
    setInputTag(value);
  }

  function removeTag(index: number) {
    if (!tags) return;
    const newTags = tags.filter((_, i) => i != index);
    setTags(newTags);

    const editedTodo = todoList.map((item: TodoItemType) => {
      if (todo.id === item.id) {
        return {
          ...item,
          tags: newTags,
          updatedAt: Timestamp.now(),
        };
      }
      return item;
    });
    setTodoList(editedTodo);
    updateList(editedTodo);
  }

  function handleDate(value: string) {
    const dueDate = value;
    // setDueDate(dueDate);

    const editedTodo = todoList.map((item: TodoItemType) => {
      if (todo.id === item.id) {
        return {
          ...item,
          dueDate: dueDate,
          updatedAt: Timestamp.now(),
        };
      }
      return item;
    });
    setTodoList(editedTodo);
    updateList(editedTodo);
  }

  useEffect(() => {
    setDueDate(todo.dueDate);
    setPriority(todo.priority);
    setDescription(todo.description);
    setTags(todo.tags);
  }, [todo]);

  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-1 font-bold text-center">Todo Item Details</div>
      <div className="mb-1 font-bold truncate">{todo.text}</div>

      {/* Due Date */}
      <div className="font-bold">Due Date</div>
      <div className="mt-1">
        <Input
          type="date"
          variant="filled"
          value={dueDate ?? ""}
          onChange={(e) => handleDate(e.target.value)}
        />
      </div>
      <Divider className="my-2" />

      {/* Priority */}
      <div className="font-bold">Priority</div>
      <div className="flex justify-evenly w-full mt-1">
        <Tooltip label="High priority">
          <img
            className={`priority-selector ${
              priority === "high" && "priority-selected"
            }`}
            src="/notification-priority-solid-svgrepo-com-error.svg"
            onClick={(e) => handlePriority("high")}
          />
        </Tooltip>
        <Tooltip label="Medium priority">
          <img
            className={`priority-selector ${
              priority === "medium" && "priority-selected"
            }`}
            src="/notification-priority-solid-svgrepo-com-medium.svg"
            onClick={(e) => handlePriority("medium")}
          />
        </Tooltip>
        <Tooltip label="Low priority">
          <img
            className={`priority-selector ${
              priority === "low" && "priority-selected"
            }`}
            src="/notification-priority-solid-svgrepo-com-low.svg"
            onClick={(e) => handlePriority("low")}
          />
        </Tooltip>
        <Tooltip label="No priority">
          <img
            className={`priority-selector ${
              priority === "none" || (!todo.priority && "priority-selected")
            }`}
            src="/notification-priority-solid-svgrepo-com-none.svg"
            onClick={(e) => handlePriority("none")}
          />
        </Tooltip>
      </div>
      <Divider className="my-2" />

      {/* Tags */}
      <div className="font-bold">Tags</div>
      <form onSubmit={addTags}>
        <Input
          value={inputTag}
          variant="filled"
          onChange={(e) => handleInputTag(e.target.value)}
          placeholder="Add tags here..."
        />
      </form>
      <div className="flex flex-wrap">
        {tags &&
          tags.map((tag, index) => {
            return (
              <div key={index} className="mx-1 my-1">
                <Tag>
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={(e) => removeTag(index)} />
                </Tag>
              </div>
            );
          })}
      </div>
      <Divider className="my-2" />

      {/* Description */}
      <div className="font-bold">Description</div>
      <Textarea
        className="flex-grow mt-2 mb-6"
        value={description ?? ""}
        onChange={(e) => handleDescription(e.target.value)}
        placeholder="Enter todo description here..."
        variant={"filled"}
      />
    </div>
  );
};

export default TodoItemDrawer;
