import {
  ProfileContainer,
  Welcome,
  ProfileName,
  ProfileImage,
  LogOutButton,
} from "@/components/Layout/Layout.styled.js";
import nurseLeader from "../../public/icons/nurseLeader.png";
import { signOut } from "next-auth/react";
import LogOutIcon from "@/utilities/Icons/LogoutIcon";

export default function Profile({ session }) {
  console.log("Session", session);
  return (
    <ProfileContainer>
      <ProfileImage
        width={56.8}
        height={56.8}
        src={session.user.image || nurseLeader}
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