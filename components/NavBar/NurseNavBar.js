import LoaderSpinner from "../LoaderSpinner/AmbulanceLoading";
import {
  NurseImage,
  NurseName,
  NurseNavbarContainer,
} from "../Layout/Layout.styled";

export default function NurseNavBar({ nurseData }) {
  if (!nurseData) {
    return <LoaderSpinner />;
  }
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