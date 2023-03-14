import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const router: NextRouter = useRouter();
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
        <div className='header-title'>
          <img className="icon" src="/todolister.svg" />
          <h1 className="logo">TODOLISTER</h1>
        </div>
      </Link>
      <nav className="link-container text-white">
        <Link href="/">Home</Link>
        {!user && <Link href="/demo">Demo</Link>}
        <Link href="/about">About Us</Link>
        {user ? (
          <div>
            <a onClick={logOut}>Log Out</a>
          </div>
        ) : (
          <div className="text-red-500">
            <Link href="/login">Log In</Link>
            <Link href="/register">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
