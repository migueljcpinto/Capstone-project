import Head from "next/head";
import React from "react";
import { Inter } from "next/font/google";
import Dashboard from "./dashboard";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Team Master</title>
        <meta name="description" content="Penguin Capstone Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {session ? <AuthenticatedUser session={session} /> : <Guest />}
    </>
  );
}

//I'm thinking of adding several access levels: Admin, user and guest.
//In the future, or possibly, Team Leader (Admin): Has full access to create, modify, delete and view all data. You can also add or remove team members.
//Team Member (User): Can view data relevant to their tasks, but cannot modify high-level structures or add/remove other members.
//Guest: Can only view public information, without the ability to make changes or view sensitive data.

//For Guests
function Guest() {
  return (
    <main className={inter.className}>
      <h3>You should Log or Sign in to have access!</h3>
      <Link href={"/login"}>Login</Link>
    </main>
  );
}

//For Auth User

function AuthenticatedUser({ session }) {
  return (
    <main className={inter.className}>
      <Dashboard session={session} />
    </main>
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
    redirect: {
      destination: "/dashboard",
      permanent: false,
    },
  };
}
