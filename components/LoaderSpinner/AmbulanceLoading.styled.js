import styled, { keyframes } from "styled-components";

const spin = keyframes`
    0% {
    transform: translateX(-200%);
  }
  50% {
    transform: translateX(25%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const LoadingContainer = styled.div`
  place-items: center;
  display: flex;
  overflow: hidden;
  min-height: 100vh;
  max-width: 50rem;
`;

export const AmbulanceLoader = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: auto;
  animation: ${spin} 4s infinite;
`;
