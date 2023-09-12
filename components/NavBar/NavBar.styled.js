import styled from "styled-components";

export const NavContainer = styled.nav`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
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
`;

export const NavLinkText = styled.span`
  display: inline;
  color: white;
  font-size: 12px;
  background: rgba(250, 255, 0, 0.29)
  border-radius: 15px;
  text-align:center;
  text-decoration-line: none;  
`;
