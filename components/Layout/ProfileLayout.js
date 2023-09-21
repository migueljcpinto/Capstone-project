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
import { useRouter } from "next/router";
import BackButton from "../BackButton/BackButton";

export default function Profile() {
  const router = useRouter();
  return (
    <ProfileContainer>
      {router.pathname !== "/dashboard" && <BackButton />}{" "}
      <ProfileImage
        width={56.8}
        height={56.8}
        src={session.user.image}
        alt="Nurse Photo"
      />
      <WelcomeName>
        <Welcome>Welcome</Welcome>
        <ProfileName>{session.user.name}</ProfileName>
      </WelcomeName>
      <LogOutButton onClick={() => signOut({ callbackUrl: "/login" })}>
        <LogOutIcon />
      </LogOutButton>
    </ProfileContainer>
  );
}
