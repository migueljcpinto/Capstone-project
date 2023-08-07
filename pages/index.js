import Head from "next/head";
import { Inter } from "next/font/google";
import NurseTeam from "@/components/NurseTeam/NurseTeam";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Team Master</title>
        <meta name="description" content="Penguin Capstone Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <NurseTeam />
      </main>
    </>
  );
}
