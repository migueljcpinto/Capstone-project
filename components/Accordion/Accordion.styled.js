import styled from "styled-components";

export const AccordionItemContainer = styled.div`
  padding: 10px;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-top: 1px solid #e0e0e0;
  background: white;
  transition: background-color 0.3s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    background-color: #fcfafb;
    transform: scale(1.02);
  }
`;

export const AccordionTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.$isOpen ? "#087f5b" : "black")};
  white-space: pre-line;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const AccordionContent = styled.div`
  border-top: 1px solid #e0e0e0;
  overflow: hidden;
`;

export const Arrow = styled.div`
  width: 10px;
  height: 10px;
  border-top: 2px solid black;
  border-left: 2px solid black;
  transform: ${(props) =>
    props.$isOpen ? "rotate(45deg)" : "rotate(-135deg)"};
  margin-right: 10px;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;
