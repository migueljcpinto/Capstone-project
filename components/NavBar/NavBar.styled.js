import styled from "styled-components";

export const NavContainer = styled.nav`
  position: fixed;
  bottom: 20px;
  left: 25.5px;
  max-width: 500px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #70d2a9;
  border-radius: 18px;
  padding: 10px;
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background: ${({ isActive }) =>
    isActive ? "rgba(250, 255, 0, 0.29)" : "#70d2a9"};
  border-radius: ${({ isActive }) => (isActive ? "15px" : "16px")};
`;

export const NavLinkText = styled.span`
  display: ${({ isActive }) => (isActive ? "inline" : "none")};
  color: white;
  font-size: 12px;
  text-decoration: ${({ isActive }) => (isActive ? "none" : "underline")};
`;
