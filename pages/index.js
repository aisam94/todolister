import Footer from "../components/Footer";
import Header from "../components/Header";
import Todo from "../components/Todo";
import Greeting from "../components/Greeting";

import { useEffect } from "react";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const HomePage = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const emailName = user
    ? user.email.substring(0, user.email.lastIndexOf("@"))
    : "";

  useEffect(() => {
    if (user) {
      //get user document or create new one with setDoc
      console.log({ user });
    }
  }, [user]);

  // if(loading) return <Loading/>;

  return (
    <>
      {!user ? (
        <>
          <Header />
          <main>
            <div className="user-greeting">Hello, Guest!</div>
            <Greeting />
            <Todo />
          </main>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <main>
            <div className="user-greeting">Hello, {emailName} !</div>
            <Todo />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default HomePage;
