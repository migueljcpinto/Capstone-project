import { NurseImage, NurseName, NurseNavbarContainer } from "./Layout.styled";

export default function NurseNavBar({ nurseData }) {
  console.log(nurseData);
  return (
    <NurseNavbarContainer>
      <NurseImage
        width={40}
        height={40}
        src={nurseData.image}
        alt={nurseData.name}
      />
      <NurseName>{nurseData.name}</NurseName>
    </NurseNavbarContainer>
  );
}
