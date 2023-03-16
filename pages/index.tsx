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
    <div className="page-width-container">
      {!user ? (
        <div className="flex flex-col items-center">
          <div className="user-greeting">Hello, Guest !</div>
          <Greeting />
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="user-greeting">Hello, {emailName} !</div>
          <Todo todoData={todoData ? todoData.todo : []} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
