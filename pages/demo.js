import React from "react";
import Todo from "../components/Todo";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Demo = () => {
  return (
    <>
      <Header />
      <main>
        <Todo />
      </main>
      <Footer />
    </>
  );
};

export default Demo;
