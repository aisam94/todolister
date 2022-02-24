import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;

  const change = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Header />
      <main className="login-main">
        <div className="form-container">
          <h1 className="form-secondary-title">Register your account</h1>
          <form className="form-inputs">
            <input
              type="text"
              name="username"
              className="form-field"
              placeholder="Username"
              value={username}
              onChange={(event) => change(event)}
              required
            />
            <input
              type="text"
              name="email"
              className="form-field"
              placeholder="Email Address"
              value={email}
              onChange={(event) => change(event)}
              required
            />
            <input
              type="password"
              name="password"
              className="form-field"
              placeholder="Password"
              value
              value={password}
              onChange={(event) => change(event)}
              required
            />
            <input
              type="password"
              name="password2"
              className="form-field"
              placeholder="Reenter Password"
              value={password2}
              onChange={(event) => change(event)}
              required
            />
            <input
              type="submit"
              className="btn btn-red form-submit"
              value="CREATE ACCOUNT"
            />
          </form>
          <div className="form-notice-container">
            <h3>
              Already have an account?<Link href="/login"> Login here</Link>
            </h3>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
