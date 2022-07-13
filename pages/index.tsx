import Footer from "../components/Footer";
import Header from "../components/Header";
import Todo from "../components/Todo";
import Greeting from "../components/Greeting";
import Loading from "../components/Loading";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { DocumentData, DocumentReference } from "@firebase/firestore";

const HomePage = (): JSX.Element => {
  const [user] = useAuthState(auth);

  const notesRef: DocumentReference<DocumentData> | undefined = user
    ? doc(db, "notes", user.uid)
    : undefined;
  const [notesSnapshot, loading] = useDocument(notesRef);

  const todoData: DocumentData | undefined = notesSnapshot
    ? notesSnapshot.data()
    : [];

  const emailName: string | undefined = user
    ? user?.email?.substring(0, user.email.lastIndexOf("@"))
    : "";

  if (loading) return <Loading />;

  return (
    <>
      {!user ? (
        <>
          <Header />
          <main>
            <div className="user-greeting">Hello, Guest !</div>
            <Greeting />
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
