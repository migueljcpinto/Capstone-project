import styled from "styled-components";

export const DatesDisplay = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  width: 100%;
  align-items: center;
  background-color: #fafafc;
  width: 300px;
  padding: 0.5rem 0.5rem;
  border-radius: 7px;
`;

export const Dates = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

export const DatesItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background-color: #fff4e6;
  border: 1px solid #e0e0e0;
  border-radius: 7px;
  margin-bottom: 0.5rem;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  color: #ef8059;
  padding: 0.5rem;
  border: none;
  border-radius: 7px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #ef8059;
    color: white;
  }
`;
