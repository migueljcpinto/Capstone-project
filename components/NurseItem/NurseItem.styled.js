import styled from "styled-components";

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
