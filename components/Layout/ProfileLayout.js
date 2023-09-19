import {
  ProfileContainer,
  Welcome,
  ProfileName,
  ProfileImage,
  LogOutButton,
} from "@/components/Layout/Layout.styled.js";
import { signOut } from "next-auth/react";

export default function Profile({ session }) {
  return (
    <ProfileContainer>
      <ProfileImage
        width={56.8}
        height={56.8}
        src={session.user.image}
        alt="Nurse Photo"
      />
      <div>
        <Welcome>Welcome</Welcome>
        <ProfileName>{session.user.name}</ProfileName>
      </div>
      <LogOutButton onClick={() => signOut({ callbackUrl: "/login" })}>
        Log out{" "}
      </LogOutButton>
    </ProfileContainer>
  );
}
