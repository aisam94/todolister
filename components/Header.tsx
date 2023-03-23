import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";

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

  const emailName: string | undefined = user
    ? user?.email?.substring(0, user.email.lastIndexOf("@"))
    : "";

  return (
    <header className="flex relative items-center py-2">
      <Link href="/">
        <div className="header-title cursor-pointer">
          <img className="icon" src="/todolister.svg" />
          <h1 className="logo text-2xl mr-4">TODOLISTER</h1>
        </div>
      </Link>
      <div className="w-full flex justify-center absolute">
        <div className="max-sm:hidden text-white uppercase text-xl w-40 text-center truncate">
          {emailName}
        </div>
      </div>
      {/* For small view */}
      <Accordion allowToggle className="max-sm:block hidden">
        <AccordionItem border={"none"}>
          <AccordionButton
            className="absolute top-0 right-0"
            w="auto"
            p={".9rem"}
          >
            <img className="h-5 w-5" src="/hamburger.svg" />
          </AccordionButton>
          <AccordionPanel>
            <div className="w-full flex justify-center">
              <div className="text-white uppercase text-lg w-40 text-center truncate">
                {emailName}
              </div>
            </div>
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
              <div
                className="header-link-auth text-primary hover:bg-accent"
                onClick={logOut}
              >
                Logout
              </div>
            ) : (
              <div className="text-primary max-sm:flex max-sm:flex-col">
                <Link href="/register">
                  <span className="header-link-auth hover:bg-accent">
                    Register
                  </span>
                </Link>
                <Link href="/login">
                  <span className="header-link-auth hover:bg-accent font-bold text-lg">
                    Login
                  </span>
                </Link>
              </div>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* For normal view */}
      <nav className="link-container max-sm:hidden">
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
          <div
            className="header-link-auth text-primary hover:bg-accent"
            onClick={logOut}
          >
            Logout
          </div>
        ) : (
          <div className="text-primary">
            <Link href="/register">
              <span className="header-link-auth hover:bg-accent">Register</span>
            </Link>
            <Link href="/login">
              <span className="header-link-auth hover:bg-accent font-bold text-lg">
                Login
              </span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
