import Header from "../components/Header";
import Footer from "../components/Footer";
import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <>
      <Header />
      <main className="about-container">
        <h1 className="about-title"> About Us </h1>
        <p className="about-paragraph">
          This website offer users to create their own personalised todo lists.
          Users can create an account in less than a minute and sign in to start
          making their todo list.Every todo list that has been created will be
          saved and can be viewed again after logging in.
        </p>
      </main>
      <Footer />
    </>
  );
};
export default About;
