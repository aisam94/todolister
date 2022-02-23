import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Register = () => {
  return (
    <>
      <body>
        <Header />
        <main class="login-main">
          <div class="form-container">
            <h1 class="form-secondary-title">Register your account</h1>
            <form class="form-inputs">
              <input
                type="text"
                name="username"
                class="form-field"
                placeholder="Username"
                value
                required
              />
              <input
                type="text"
                name="email"
                class="form-field"
                placeholder="Email Address"
                value
                required
              />
              <input
                type="password"
                name="password"
                class="form-field"
                placeholder="Password"
                value
                required
              />
              <input
                type="password"
                name="password2"
                class="form-field"
                placeholder="Reenter Password"
                value
                required
              />
              <input
                type="submit"
                class="btn form-submit"
                value="CREATE ACCOUNT"
              />
            </form>
            <div class="form-notice-container">
              <h3>
                Already have an account?<Link href="/login"> Login here</Link>
              </h3>
            </div>
          </div>
        </main>
      </body>
      <Footer />
    </>
  );
};

export default Register;
