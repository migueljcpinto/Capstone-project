import GlobalStyle from "@/styles";
import Head from "next/head";
import { SWRConfig } from "swr";
import fetcher from "@/utilities/fetcher";
import NavBar from "@/components/NavBar/NavBar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Head>
          <title>Team Master</title>
        </Head>
        <Component {...pageProps} />
        <NavBar />
      </SWRConfig>
    </>
  );
}
