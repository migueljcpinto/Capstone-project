import styled from "styled-components";

export const AuthContainer = styled.div`
  background-color: #f6fbf9;
  border-radius: 32px;
  height: 550px;
  width: 350px;
  position: relative;
`;

export const AuthSec = styled.div`
  position: absolute;
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
  &:disabled {
    background-color: #ccc;
    opacity: 0.7;
    cursor: not-allowed;
  }
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
  line-height: 19.5px;
`;

export const SuccessModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #e1ffe0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem 2rem 2rem 2rem;
  background-color: #fff;
  width: 300px;
  z-index: 1000;
  border-radius: 8px;
  position: absolute;
  z-index: 1;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  & h4 {
    text-transform: uppercase;
  }

  & button {
    border: 1px solid #59b660;
    border-radius: 1.5rem;
    background-color: #59b660;
    font-size: 1rem;
    line-height: 1.2;
    white-space: nowrap;
    text-decoration: none;
    padding: 0.5rem 1.5rem;
    margin: 0.25rem;
    cursor: pointer;
    color: white;
    text-transform: uppercase;
    &:hover {
      color: #59b660;
      background-color: white;
    }
  }
`;

export const SuccessOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

export const ErrorMessage = styled.p`
  color: #fff;
  background: #ff5b4f;
  border-radius: 5px;
  font-size: small;
  text-align: center;
  padding: 4px;
`;
