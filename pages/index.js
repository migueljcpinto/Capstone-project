import Head from "next/head";
import styled from "styled-components";
import { Inter } from "next/font/google";
import NurseTeam from "@/components/NurseTeam/NurseTeam";
import FormAddNurse from "@/components/FormAddNurse/FormAddNurse";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Team Master</title>
        <meta name="description" content="Penguin Capstone Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <Heading>Team 👨🏻‍⚕️ Master</Heading>
        <FormAddNurse />
        <NurseTeam />
      </main>
    </>
  );
}

const Heading = styled.h1`
  text-align: center;
`;
