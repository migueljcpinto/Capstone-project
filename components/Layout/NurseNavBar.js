import { NurseImage, NurseName, NurseNavbarContainer } from "./Layout.styled";

export default function NurseNavBar({ nurseData }) {
  console.log(nurseData);
  return (
    <NurseNavbarContainer>
      <NurseImage src={nurseData.image} alt={nurseData.name} />
      <NurseName>{nurseData.name}</NurseName>
    </NurseNavbarContainer>
  );
}
