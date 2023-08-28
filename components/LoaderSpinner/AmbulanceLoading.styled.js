import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: translateX(700%) translateY(0);
  }
  25% {
    transform: translateX(500%) translateY(-5px);
  }
  50% {
    transform: translateX(300%) translateY(0);
  }
  75% {
    transform: translateX(100%) translateY(-5px);
  }
  100% {
    transform: translateX(-900%) translateY(0);
  }
`;

export const AmbulanceLoader = styled.div`
  position: absolute;
  font-size: 17px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-bottom-color: gainsboro;
  animation: ${spin} 4s infinite;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;
