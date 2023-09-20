import { AmbulanceLoader, LoadingContainer } from "./AmbulanceLoading.styled";

export default function LoaderSpinner() {
  return (
    <LoadingContainer>
      <AmbulanceLoader src="/ambulance.gif" alt="Loading Ambulance" />
    </LoadingContainer>
  );
}
