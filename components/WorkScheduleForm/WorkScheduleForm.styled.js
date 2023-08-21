import styled from "styled-components";

export const ScheduleFormContainer = styled.form`
  display: grid;
  align-items: center;
  background-color: #fff4e6;
  max-width: 400px;
  gap: 1.2rem;
  padding: 3.2rem 4rem;
  border-radius: 7px;
`;

export const Botton = styled.button`
  background-color: #ffa94d;
  color: black;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 7px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #ff922b;
  }
`;

export const ReturnLinkStyled = styled.button`
  background-color: #fafafc;
  color: #000;
  padding: 0.6rem 1.2rem;
  margin: 5px 15px 5px 30px;
  width: 100px;
  border: none;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #6fc6ff;
  }
`;
