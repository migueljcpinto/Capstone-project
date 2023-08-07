import Link from "next/link";
import Image from "next/image";
import { StyledListItem } from "../NurseTeam/NurseTeam.styled";

export default function NurseItem({ nurse }) {
  return (
    <StyledListItem>
      <Image
        width={76.8}
        height={76.8}
        src={nurse.image}
        alt="Random Nurse Photo"
      />
      <Link
        style={{ color: "black", textDecoration: "none" }}
        href={`/NursePage/${nurse._id}`}
      >
        {nurse.name} <br /> {nurse.role}
      </Link>
    </StyledListItem>
  );
}
