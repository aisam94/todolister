import React, { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/too-many-requests") {
          createNotification(
            "Access to this account has been temporarily disabled due to many failed login attempts"
          );
        } else if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        ) {
          createNotification("Email or password is wrong");
        } else {
          createNotification("Error signing in");
        }
        console.log({ errorCode });
        console.log({ errorMessage });
      });
  };

  const change = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    signIn(email, password);
  };

  const createNotification = (errorMsg) => {
    return NotificationManager.error(errorMsg, "", 500);
  };

  return (
    <>
      <Header />
      <NotificationContainer />
      <main className="login-main">
        <div className="form-container">
          <h1 className="form-secondary-title">Sign in to your account</h1>
          <form className="form-inputs" onSubmit={(event) => submit(event)}>
            <input
              type="email"
              name="email"
              className="form-field"
              placeholder="Email"
              value={email}
              onChange={(event) => change(event)}
              required
            />
            <input
              type="password"
              name="password"
              className="form-field"
              placeholder="Password"
              value={password}
              onChange={(event) => change(event)}
              required
            />
            <input
              type="submit"
              className="btn btn-red form-submit"
              value="LOG IN"
            />
          </form>
          <div className="form-notice-container">
            <div>
              <input className="" name="remember-me" type="checkbox" />
              <label htmlFor="remember-me" className="form-notice">
                Remember me
              </label>
            </div>
            <Link href="#">
              <a className="form-notice">Forgot password?</a>
            </Link>
            <h3 className="form-notice">
              Don't have an account?
              <Link href="/register"> Register here.</Link>
            </h3>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
