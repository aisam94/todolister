import Footer from "../components/Footer";
import Header from "../components/Header";
import Todo from "../components/Todo";
import Greeting from "../components/Greeting";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <div class="user-greeting">Hello, Guest!</div>
        <Greeting />
        <Todo />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
