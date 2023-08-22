import styled from "styled-components";

export const WorkDatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const DatesDisplay = styled.div`
  display: grid;
  align-items: center;
  background-color: #fff4e6;
  max-width: 400px;
  padding: 3.2rem 4rem;
  border-radius: 7px;
`;

export const Dates = styled.div`
  padding: 1rem;
  align-items: center;
  border: solid 1px white;
  border-radius: 7px;
  margin: 2px;
`;

export const DeleteButton = styled.button`
  background-color: #fafafc;
  color: black;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 7px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #ef8059;
  }
`;
