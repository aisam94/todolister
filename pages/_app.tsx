import "../styles/styles.css";
import "react-notifications/lib/notifications.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Loading from "../components/Loading";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  return <Component {...pageProps} />;
}
