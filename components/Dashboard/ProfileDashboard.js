import {
  ProfileContainer,
  Welcome,
  SVGSeach,
  ProfileName,
  ProfileImage,
} from "@/components/Dashboard/Dashboard.styled";
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
        <ProfileName>Team Leader Name</ProfileName>
      </div>
      <SVGSeach
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M16.1355 16.3333L12.8593 13.0692M14.5742 8.94445C14.5742 5.72279 11.9529 3.11111 8.71934 3.11111C5.4858 3.11111 2.8645 5.72279 2.8645 8.94445C2.8645 12.1661 5.4858 14.7778 8.71934 14.7778C11.9529 14.7778 14.5742 12.1661 14.5742 8.94445Z"
          stroke="#000B23"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </SVGSeach>{" "}
    </ProfileContainer>
  );
}
