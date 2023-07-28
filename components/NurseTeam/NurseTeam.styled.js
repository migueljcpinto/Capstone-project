import styled from "styled-components";

export const StyledHeading = styled.h2`
  text-align: center;
  color: var(--color-nemo);
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
  padding: 0;
  margin-bottom: 2rem;
`;

export const StyledListItem = styled.li`
  width: 400px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 50px;
  border: 1px solid #000;
  opacity: 0.6;
  background: rgba(17, 179, 207, 0.1);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
  margin-bottom: 10px;
`;
