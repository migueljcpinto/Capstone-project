import styled from "styled-components";

export const DatesDisplay = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  width: 100%;
  align-items: center;
  background-color: white;
  width: 300px;
  padding: 0.5rem 0.5rem;
  border-radius: 7px;
`;

export const Dates = styled.li`
  padding: 1rem;
  background-color: #fff4e6;
  border: solid 1px white;
  border-radius: 7px;
  margin: 5px 5px;
  list-style-type: none;
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
