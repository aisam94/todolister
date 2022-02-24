import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Todo from "../components/Todo";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <article className="announcement">
          <h2 className="big-announcement">Create a todo list!</h2>
          <h2 className="small-announcement">
            Create your own personal todo list using this website. If you dont
            have an account, click down below to register and start making
            lists. You can try making a list on the right.
          </h2>
          <Link href="/register">
            <button className="btn btn-sign-up">Sign Up</button>
          </Link>
          <h2 className="small-announcement">
            Already have an account?
            <Link href="/login">
              <a className="login-link"> Login here!</a>
            </Link>
          </h2>
        </article>
        <Todo />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
