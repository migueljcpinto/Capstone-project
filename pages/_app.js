import GlobalStyle from "@/styles";
import Head from "next/head";
import { SWRConfig } from "swr";
import fetcher from "@/utilities/fetcher";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout/Layout";
import TeamUpLogo from "@/components/TeamUpLogo/TeamUpLogo";
import { useEffect, useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <>
      {loading && <TeamUpLogo />}
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Head>
          <title>Team´Up</title>
        </Head>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
