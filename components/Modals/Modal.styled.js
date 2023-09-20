import styled from "styled-components";

export const ModalStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #e1ffe0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem 2rem 2rem 2rem;
  background-color: #fff;
  width: 300px;
  z-index: 1000;
  border-radius: 8px;
  position: absolute;
  z-index: 1;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  & h4 {
    text-transform: uppercase;
  }

  & button {
    border: 1px solid
      ${({ type }) => (type === "error" ? "#ff6666" : "#59b660")};
    border-radius: 1.5rem;
    background-color: ${({ type }) =>
      type === "error" ? "#ff6666" : "#59b660"};
    font-size: 1rem;
    line-height: 1.2;
    white-space: nowrap;
    text-decoration: none;
    padding: 0.5rem 1.5rem;
    margin: 0.25rem;
    cursor: pointer;
    color: white;
    text-transform: uppercase;
    &:hover {
      color: #59b660;
      background-color: white;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;
