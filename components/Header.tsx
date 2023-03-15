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
        <div className="header-title cursor-pointer">
          <img className="icon" src="/todolister.svg" />
          <h1 className="logo text-2xl">TODOLISTER</h1>
        </div>
      </Link>
      <nav className="link-container">
        <Link href="/">
          <div className="header-link">Home</div>
        </Link>
        {!user && (
          <Link href="/demo">
            <div className="header-link">Demo</div>
          </Link>
        )}
        <Link href="/about">
          <div className="header-link">About</div>
        </Link>
        {user ? (
          <div>
            <a onClick={logOut}>Log Out</a>
          </div>
        ) : (
          <div className="text-primary p-0">
            <Link href="/login">
              <span className="header-link-auth hover:bg-accent">Login</span>
            </Link>
            <Link href="/register">
              <span className="header-link-auth hover:bg-accent">Register</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
