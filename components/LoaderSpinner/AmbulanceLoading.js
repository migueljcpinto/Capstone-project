import { LoadingContainer } from "./AmbulanceLoading.styled";
import React from "react";
import Lottie from "lottie-react";
import AmbulanceLoading from "@/utilities/lotties/AmbulanceLoading.json";

export default function LoaderSpinner() {
  return (
    <LoadingContainer>
      <Lottie
        animationData={AmbulanceLoading}
        loop={true}
        height={20}
        width={20}
      />
    </LoadingContainer>
  );
}
