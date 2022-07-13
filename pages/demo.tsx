import React from "react";
import Todo from "../components/Todo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { NextPage } from "next";

const Demo = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Todo todoData={[]} />
        {/* <Todo /> */}
      </main>
      <Footer />
    </>
  );
};

export default Demo;
