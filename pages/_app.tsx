import "../styles/styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Loading from "../components/Loading";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  return (
    <ChakraProvider>
      <Head>
        <title>Todolister</title>
        <meta name="description" content="Todolister" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ChakraProvider>
  );
}
