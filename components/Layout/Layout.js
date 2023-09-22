import NavBar from "../NavBar/NavBar";
import { useSession } from "next-auth/react";
import Profile from "./ProfileLayout";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div>
      {session && router.pathname === "/dashboard" && (
        <Profile session={session} />
      )}
      {children}
      {session && <NavBar session={session} />}
    </div>
  );
}
