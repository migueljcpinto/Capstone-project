import BackButtonIcon from "@/utilities/Icons/BackButtonIcon";
import { useRouter } from "next/router";
import { StyledBackButton } from "./BackButton.styled";

export default function BackButton() {
  const router = useRouter();
  function handleGoBack() {
    router.back();
  }
  return (
    <StyledBackButton onClick={handleGoBack}>
      <BackButtonIcon />
    </StyledBackButton>
  );
}
