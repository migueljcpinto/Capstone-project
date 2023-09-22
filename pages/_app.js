import GlobalStyle from "@/styles";
import Head from "next/head";
import { SWRConfig } from "swr";
import fetcher from "@/utilities/fetcher";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import LottieAnimation from "@/components/TeamUpLogo/TeamUpLottie";
import NavBar from "@/components/NavBar/NavBar";

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
      {loading && <LottieAnimation />}
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Head>
          <title>Team´Up</title>
        </Head>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <NavBar />
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
