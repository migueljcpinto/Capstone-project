import styled, { keyframes } from "styled-components";

const TitleAnime = keyframes`
0%, 100% {
    background-size: 100% 10px;
    background-position: 100% 0%;
  }
  50% {
    background-size: 100% 100%;
    background-position: 0% 100%;
  }
`;

export const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  background-image: linear-gradient(#70d2a9, #70d2a9);
  background-size: 100% 10px;
  background-repeat: no-repeat;
  background-position: 100% 0%;
  animation: ${TitleAnime} 2.2s infinite alternate;
`;

export const AuthContainer = styled.div`
  position: relative;
  background-color: #f6fbf9;
  border-radius: 32px;
  height: 660px;

  width: 350px;
`;

export const AuthSec = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin: 40px;
  align-content: center;
`;

export const Inputs = styled.div`
  position: relative;
`;

export const AuthInput = styled.input`
  width: 255px;
  height: 55px;
  margin: 7px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  border-color: ${(props) => (props.$hasError ? "red" : "rgba(0, 0, 0, 0.1)")};
`;

export const AuthButton = styled.button`
  border-radius: 15px;
  border: 1px solid 212b27;
  background: #84c7ae;
  margin: 15px auto;
  width: 270px;
  height: 59px;
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;

  &:focus {
    border-color: #0077cc;
    box-shadow: 0 0 5px rgba(0, 119, 204, 0.5);
  }
`;

export const AuthText = styled.h2`
  color: #212b27;
  font-size: 28px;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  line-height: 46.8px;
`;

export const EnjoyText = styled.h4`
  color: #32403b;
  font-size: 12px;
  text-align: center;
  font-style: normal;
  font-weight: 400;
`;

export const ErrorMessage = styled.p`
  color: #fff;
  background: #ff5b4f;
  border-radius: 5px;
  font-size: small;
  text-align: center;
  padding: 4px;
`;
