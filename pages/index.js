import Footer from "../components/Footer";
import Header from "../components/Header";
import Todo from "../components/Todo";
import Greeting from "../components/Greeting";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Greeting />
        <Todo />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
