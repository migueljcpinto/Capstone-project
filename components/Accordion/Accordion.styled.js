import styled from "styled-components";

export const AccordionItemContainer = styled.div`
  padding: 10px;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fcfafb;
  }

  .title {
    font-size: 18px;
    font-weight: 500;
  }

  .icon {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const AccordionContent = styled.div`
  padding: 20px;
  border-top: 1px solid #e0e0e0;
`;
