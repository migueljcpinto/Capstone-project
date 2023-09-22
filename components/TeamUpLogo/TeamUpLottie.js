import React from "react";
import Lottie from "lottie-react";
import TeamUpLottie from "@/utilities/lotties/TeamUpLottie.json";
import { TeamUpContainer } from "./TeamUpLogo.styled";

export default function LottieAnimation() {
  return (
    <TeamUpContainer>
      <Lottie animationData={TeamUpLottie} loop={true} height={50} width={50} />
    </TeamUpContainer>
  );
}
