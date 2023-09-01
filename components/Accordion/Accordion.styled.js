import styled from "styled-components";

export const AccordionItemContainer = styled.div`
  padding: 10px;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  border-left: ${(props) =>
    props.isOpen ? "4px solid #087f5b" : "1px solid #e0e0e0"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fcfafb;
  }
`;

export const AccordionTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.isOpen ? "#087f5b" : "black")};
`;

export const AccordionContent = styled.div`
  padding: 20px;
  border-top: 1px solid #e0e0e0;
`;
