import styled from "styled-components";

export const StyledHeading = styled.h2`
  display: grid;
  position: relative;
  text-align: center;
  color: black;
`;

export const StyledListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding: 0.4rem;
  margin-bottom: 2rem;
`;

export const ButtonStyled = styled.button`
  text-decoration: none;
  background-color: #ffe6be;
  color: #000;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 10%;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);

  z-index: 999;
  &:hover {
    background-color: #e37820;
  }
`;
