import {
  ProfileContainer,
  Welcome,
  ProfileName,
  ProfileImage,
} from "@/components/Dashboard/Dashboard.styled";
import SearchIcon from "@/utilities/Icons/SearchIcon";
import nurseLeader from "../../public/icons/nurseLeader.png";

export default function Profile({ session, signOut }) {
  console.log("Profile", session);

  return (
    <ProfileContainer>
      <ProfileImage
        width={76.8}
        height={76.8}
        src={nurseLeader}
        alt="Nurse Photo"
      />
      <div>
        <Welcome>Welcome</Welcome>
        <ProfileName></ProfileName>
      </div>
      <button onClick={() => signOut()}>Log out</button>
    </ProfileContainer>
  );
}
