import Footer from "../components/Footer";
import Header from "../components/Header";
import Todo from "../components/Todo";
import Greeting from "../components/Greeting";
import Loading from "../components/Loading";

import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

const HomePage = () => {
  const [user] = useAuthState(auth);
  const emailName = "";

  const notesRef = user ? doc(db, "notes", user.uid) : null;
  const [notesSnapshot, loading] = useDocument(notesRef);
  if (loading) return <Loading />;
  const todoData = notesSnapshot ? notesSnapshot.data() : [];

  emailName = user ? user.email.substring(0, user.email.lastIndexOf("@")) : "";

  return (
    <>
      {!user ? (
        <>
          <Header />
          <main>
            <div className="user-greeting">Hello, Guest !</div>
            <Greeting />
            {/* <Todo /> */}
          </main>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <main>
            <div className="user-greeting">Hello, {emailName} !</div>
            <Todo todoData={todoData ? todoData.todo : []} />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default HomePage;
