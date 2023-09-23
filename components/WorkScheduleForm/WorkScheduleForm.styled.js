import styled from "styled-components";

export const ScheduleFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafc;
  max-width: 300px;
  gap: 1.2rem;
  padding: 3.2rem 4rem;
  border-radius: 7px;
`;

export const Button = styled.button`
  background-color: #84c7ae;
  color: white;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 7px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: black;
  }
`;

export const ShiftSelect = styled.div`
  display: flex;
`;

export const ShiftOption = styled.button`
  width: 100px;
  height: 45px;
  flex-shrink: 0;
  padding: 8px 10px;
  margin: 10px;
  cursor: pointer;
  border-radius: 13px;
  border: none;
  background-color: ${(props) => (props.isActive ? "#f2c28f" : "#fff")};
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff922b;
  }
`;
