import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <main className="">
      <h1 className="about-title text-primary font-bold text-xl"> About Us </h1>
      <p className="about-paragraph text-justify">
        This website offer users to create their own personalised todo lists.
        Users can create an account in less than a minute and sign in to start
        making their todo list. Every todo list that has been created will be
        saved and can be viewed again after logging in.
      </p>
    </main>
  );
};
export default About;
