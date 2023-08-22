import styled from "styled-components";

export const NotificationContainer = styled.div`
  position: absolute;
  top: 43%;
  left: 50%;
  padding: 10px 20px;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  z-index: 10;
  border-radius: 5px;
  background-color: ${({ type }) =>
    type === "add" ? "#DFF2BF" : type === "remove" ? "#FFBABA" : "black"};
`;
