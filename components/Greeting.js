import Link from "next/link";

const Greeting = () => {
  return (
    <article className="greeting">
      <h2 className="big-greeting">Create a todo list!</h2>
      <h2 className="small-greeting">
        Create your own personal todo list using this website. If you dont have
        an account, click down below to register and start making lists. You can
        also try making a list by visiting the demo page.
      </h2>
      <Link href="/register">
        <button className="btn btn-sign-up">Sign Up</button>
      </Link>
      <h2 className="small-greeting">
        Already have an account?
        <Link href="/login">
          <a className="login-link"> Login here!</a>
        </Link>
      </h2>
    </article>
  );
};

export default Greeting;
