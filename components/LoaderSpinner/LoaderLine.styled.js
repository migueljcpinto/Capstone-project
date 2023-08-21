import styled, { keyframes } from "styled-components";

const BaseLine = styled.div`
  position: absolute;
  top: 50%;
  height: 4px;
  transform: translateY(-50%);
`;

export const LoadingLineLow = styled(BaseLine)`
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  background-color: #61dbfb80;
`;

export const LoadingLineHigh = styled(BaseLine)`
  left: 30%;
  width: 0px;
  background-color: #61dcfb;
  animation: line 4s infinite ease-in-out;

  @keyframes line {
    0%,
    100% {
      padding-right: 1px;
    }
    50% {
      padding-right: 25%;
    }
    99% {
      padding-right: 40%;
    }
  }
`;
