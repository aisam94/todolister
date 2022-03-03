import Link from "next/link";

import { useRouter } from "next/router";
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
        console.log({ error });
      });
  };

  return (
    <header>
      <Link href="/">
        <h1 className="logo">TODOLISTER</h1>
      </Link>
      <nav className="link-container">
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        {user ? (
          <div>
            <a onClick={logOut}>Log Out</a>
          </div>
        ) : (
          <div>
            <Link href="/login">Log In</Link>
            <Link href="/register">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
