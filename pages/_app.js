import "../styles/styles.css";
import "react-notifications/lib/notifications.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Loading from "../components/Loading";

export default function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  return <Component {...pageProps} />;
}
