import {
  ProfileContainer,
  Welcome,
  ProfileName,
  ProfileImage,
} from "@/components/Dashboard/Dashboard.styled";
import SearchIcon from "@/utilities/Icons/SearchIcon";
import nurseLeader from "../../public/icons/nurseLeader.png";

export default function Profile() {
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
        <ProfileName>Thomas Bauer</ProfileName>
      </div>
      <SearchIcon />
    </ProfileContainer>
  );
}
