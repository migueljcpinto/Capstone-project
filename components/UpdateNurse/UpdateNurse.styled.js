import styled from "styled-components";

export const StyledDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-height: 80vh;
  width: 80%;
  max-width: 600px;
  overflow-y: auto;
`;

export const XButton = styled.button`
  position: absolute;
  top: 50px;
  right: 10px;
  border: none;
  background: #e0e0e0;
  color: #333;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const UpdateFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fcfafb;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px 40px;
  width: 100%;
`;

export const UpdateModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;
