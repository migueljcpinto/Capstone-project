import Head from "next/head";
import React from "react";
import { Inter } from "next/font/google";
import Dashboard from "./dashboard";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import LoginPage from "./login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  console.log("index", session);
  if (session) {
    return (
      <>
        <Head>
          <title>Team Master</title>
          <meta name="description" content="Penguin Capstone Project" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Dashboard session={session} />
      </>
    );
  }
  return (
    <>
      <LoginPage />
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
