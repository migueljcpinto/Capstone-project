import Image from "next/image";
import { StyledListItem, NurseLink } from "../NurseItem/NurseItem.styled";

export default function NurseItem({ nurse }) {
  console.log(nurse);
  return (
    <StyledListItem>
      <Image
        width={76.8}
        height={76.8}
        src={nurse.image}
        alt="Random Nurse Photo"
      />
      <NurseLink href={`/nurses/${nurse._id}`} nurse={nurse}>
        {nurse.name} <br /> {nurse.role}
      </NurseLink>
    </StyledListItem>
  );
}
