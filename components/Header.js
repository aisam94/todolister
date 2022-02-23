import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Link href="/">
        <h1 class="logo">TODOLISTER</h1>
      </Link>
      <nav class="link-container">
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/login">Log In</Link>
        <Link href="/register">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
