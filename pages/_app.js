import { useEffect } from "react";
import "../styles/styles.css";
import "react-notifications/lib/notifications.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Loading from "../components/Loading";
import { doc, setDoc } from "firebase/firestore";

export default function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  // useEffect(() => {
  //   if (user) {
  //     const docRef = doc(db, "users", user.uid);
  //     setDoc(docRef, { email: user.email }, { merge: true });
  //   }
  // }, [user]);

  if (loading) return <Loading />;

  return <Component {...pageProps} />;
}
