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

export const AuthInput = styled.input`
  width: 255px;
  height: 55px;
  margin: 7px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
`;

export const AuthButton = styled.button`
  border-radius: 15px;
  border: 1px solid 212b27;
  background: #84c7ae;
  margin: 15px auto;
  width: 255px;
  height: 59px;
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
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
