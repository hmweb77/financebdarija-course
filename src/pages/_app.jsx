
import "@/styles/globals.css";

import Layout from '@/components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout pageTitle="FINANCEBDARIJA" description="Financebdarija officielle page for finance, moroccan stock market, podcasts and course ">
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
