import Head from "next/head";
import { Inter } from "next/font/google";
import { useSession, signOut } from "next-auth/react";
import Dashboard from "./dashboard";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  function handleSignOut() {
    signOut();
  }

  function handleGoLoginPage() {
    router.push("/login");
  }

  if (session) {
    console.log("index", session);
    return (
      <>
        <Head>
          <title>Team Master</title>
          <meta name="description" content="Penguin Capstone Project" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main className={inter.className}>
          <Dashboard session={session} signOut={handleSignOut}></Dashboard>
          <NavBar />
        </main>
      </>
    );
  }
  return (
    <>
      Not loged in <br />
      <button onClick={handleGoLoginPage}>Login</button>
    </>
  );
}
