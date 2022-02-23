import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Login = () => {
  return (
    <>
      <body>
        <Header />
        <main class="login-main">
          <div class="form-container">
            <h1 class="form-secondary-title">Sign in to your account</h1>
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
                type="password"
                name="password"
                class="form-field"
                placeholder="Password"
                value
                required
              />
              <input type="submit" class="btn form-submit" value="LOG IN" />
            </form>
            <div class="form-notice-container">
              <div>
                <input class="" name="remember-me" type="checkbox" />
                <label for="remember-me" class="form-notice">
                  Remember me
                </label>
              </div>
              <Link href="#">
                <a class="form-notice">Forgot password?</a>
              </Link>
              <h3 class="form-notice">
                Don't have an account?
                <Link href="/register"> Register here.</Link>
              </h3>
            </div>
          </div>
        </main>
      </body>
      <Footer />
    </>
  );
};

export default Login;
