
import Head from 'next/head';
import "../styles/globals.css";
import Header from "../components/Header/Header.jsx"
import Footer from '@/components/Footer/Footer';


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
        <title>Financebdarija</title>
        <meta name="description" content="Website for coaches in lisbon " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <Header/>
      <Component {...pageProps} />
   <Footer/>
    </>
  );
}

export default MyApp;
