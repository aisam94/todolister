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

  if (loading) return <Loading />;

  return (
    <div>
      {!user ? (
        <div className="flex flex-col items-center">
          <Greeting />
        </div>
      ) : (
        <Todo todoData={todoData ? todoData.todo : []} />
      )}
    </div>
  );
};

export default HomePage;
