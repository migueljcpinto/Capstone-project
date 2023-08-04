import styled from "styled-components";
import Link from "next/link";

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

export const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: 4.8rem 1fr auto;
  align-items: center;
  column-gap: 1.6rem;
  padding: 1.2rem;
  border-radius: 7px;
  background-color: #fafafc;
  transition: 0.5s;

  &:hover {
    background-color: #fff4e6;
  }

  img {
    border-radius: 50%;
    width: 100%;
  }
`;

export const ButtonStyled = styled(Link)`
text-decoration:none;
background-color: #FFE6BE;
color: #000;
padding: 0.8rem 1.2rem;
border: none;
border-radius: 10%;
cursor: pointer;
transition: 0.3s;
align-items: center;
justify-content:center;
position: fixed;
top: 10%;
right: 40%;
z-index: 999;
  &:hover {
    background-color: #E37820;
  }
}
`;

export const AddDivStyled = styled.div``;
