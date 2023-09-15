import {
  ProfileContainer,
  Welcome,
  ProfileName,
  ProfileImage,
} from "@/components/Layout/Layout.styled.js";
import nurseLeader from "../../public/icons/nurseLeader.png";
import { signOut } from "next-auth/react";

export default function Profile({ session }) {
  return (
    <ProfileContainer>
      <ProfileImage
        width={56.8}
        height={56.8}
        src={nurseLeader}
        alt="Nurse Photo"
      />
      <div>
        <Welcome>Welcome</Welcome>
        <ProfileName>{session.user.name}</ProfileName>
      </div>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>
        Log out
      </button>
    </ProfileContainer>
  );
}
