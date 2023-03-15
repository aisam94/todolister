import React from "react";
import Todo from "../components/Todo";
import type { NextPage } from "next";

const Demo = (): JSX.Element => {
  return (
    <div className="w-full flex justify-center">
      <Todo todoData={[]} />
    </div>
  );
};

export default Demo;
