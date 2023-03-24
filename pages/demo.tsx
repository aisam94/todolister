import React from "react";
import Todo from "../components/Todo";
import type { NextPage } from "next";

const Demo = (): JSX.Element => {
  const description =
    "This is an example of a todo item description. You can edit the details for due dates, priority, tags and description using this section.";
  const demoTodo = [
    {
      id: "1",
      text: "Start by adding your own todo",
      checked: false,
      description: description,
      priority: "high",
      tags: ["demo", "test", "first"],
    },
    {
      id: "2",
      text: "Click todo item to edit the details",
      checked: false,
      description: description,
      priority: "low",
      tags: ["demo", "test", "second"],
    },
    {
      id: "3",
      text: "This is a checked todo item",
      checked: true,
      description: description,
      priority: "low",
      tags: ["demo", "test", "third"],
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <Todo todoData={demoTodo} />
    </div>
  );
};

export default Demo;
