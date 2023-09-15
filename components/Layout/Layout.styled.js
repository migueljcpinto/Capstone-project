import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const NavBurger = styled.nav`
  position: fixed;
  bottom: 10px;
  left: 40%;
  transform: translateX(-40%);

  @media (max-width: 768px) {
    left: 2%;
    transform: translateX(-10%);
  }
`;

export const Burger = styled.button`
  position: fixed;
  bottom: 10px;
  left: 2%;
  width: 4rem;
  height: 4rem;
  z-index: 1001;
  align-items: center;
  background-color: #70d2a9;
  border: 5px solid white;
  border-radius: 50%;
  display: flex;
  justify-content: space-evenly;
  flex-flow: column nowrap;
  cursor: pointer;
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: white;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

export const NavContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: ${({ open }) => (open ? "20px" : "-300px")};
  background-color: #70d2a9;
  border-radius: 18px;
  justify-content: space-around;
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 315px;
  padding: 7px;
  align-items: center;
  z-index: 1000;
  animation: ${slideIn} 0.3s ease-in-out forwards;
  margin-left: 10px;
`;

export const NavItem = styled.div`
  display: flex;
  color: white;
  margin-left: auto;
  width: 50px;
`;

export const NavLinkText = styled.span`
  display: inline;
  color: white;
  font-size: 12px;
  background: rgba(250, 255, 0, 0.29)
  border-radius: 15px;
  text-align: center;
  margin-left:auto;
  text-decoration-line: none;  
`;
