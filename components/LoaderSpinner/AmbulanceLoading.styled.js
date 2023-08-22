import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: translateX(700%);
  }
  to {
    transform: translateX(-900%);
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
`;
