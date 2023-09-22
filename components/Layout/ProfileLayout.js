import {
  ProfileContainer,
  Welcome,
  ProfileName,
  ProfileImage,
  LogOutButton,
  WelcomeName,
} from "@/components/Layout/Layout.styled.js";
import LogOutIcon from "@/utilities/Icons/LogoutIcon";
import { signOut } from "next-auth/react";

export default function Profile({ session }) {
  return (
    <ProfileContainer>
      <ProfileImage
        width={56.8}
        height={56.8}
        src={session && session.user ? session.user.image : "wait"}
        alt="Nurse Photo"
      />
      <WelcomeName>
        <Welcome>Welcome</Welcome>
        <ProfileName>
          {session && session.user ? session.user.name : ""}
        </ProfileName>
      </WelcomeName>
      <LogOutButton onClick={() => signOut({ callbackUrl: "/login" })}>
        <LogOutIcon />
      </LogOutButton>
    </ProfileContainer>
  );
}
