import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { NextRouter } from "next/router";

const Login = () => {
  const router: NextRouter = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const signIn = (email: string, password: string) => {
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

  const change = (event: { target: HTMLInputElement }): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit = (event: FormEvent): void => {
    event.preventDefault();
    signIn(email, password);
  };

  const createNotification = (errorMsg: string): any => {
    return NotificationManager.error(errorMsg, "", 500);
  };

  return (
    <main className="login-main">
      <NotificationContainer />
      <div className="form-container">
        <h1 className="form-secondary-title">Sign in to your account</h1>
        <form className="form-inputs" onSubmit={(event) => submit(event)}>
          {/* Email */}
          <input
            type="email"
            name="email"
            className="form-field"
            placeholder="Email"
            value={email}
            onChange={(event) => change(event)}
            required
          />
          {/* Password wrapper */}
          <div className="password-wrapper">
            {/* Password */}
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              className="form-field"
              placeholder="Password"
              value={password}
              onChange={(event) => change(event)}
              required
            />
            {/* Eye indicator */}
            <div
              className="eye-indicator eye"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clipRule="evenodd"
                  />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          {/* Submit button */}
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
  );
};

export default Login;
