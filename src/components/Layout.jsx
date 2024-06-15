import Header from '@/components/Header/Header.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import Head from 'next/head';


const Layout = ({ children, pageTitle, description }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
        <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;




