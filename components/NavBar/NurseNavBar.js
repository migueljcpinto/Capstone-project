import LoaderSpinner from "../LoaderSpinner/AmbulanceLoading";
import {
  NurseImage,
  NurseName,
  NurseNavbarContainer,
} from "../Layout/Layout.styled";
import { useRouter } from "next/router";

import BackButton from "../BackButton/BackButton";

export default function NurseNavBar({ nurseData }) {
  const router = useRouter();
  if (!nurseData) {
    return <LoaderSpinner />;
  }
  return (
    <NurseNavbarContainer>
      <BackButton />

      <NurseName>{nurseData.name}</NurseName>
      <NurseImage
        width={40}
        height={40}
        src={nurseData.image}
        alt={nurseData.name}
      />
    </NurseNavbarContainer>
  );
}
