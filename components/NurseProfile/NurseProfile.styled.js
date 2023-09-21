import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const NurseProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafc;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
`;

export const NurseProfileHeader = styled.div`
  text-align: center;
`;

export const NurseImage = styled(Image)`
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export const ContactsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-top: 1rem;
  & a {
    margin: 0.5rem 0;
  }
`;

export const ActionButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-flow: row wrap;
`;

export const DeleteButtonStyled = styled.button`
  background-color: #fafafc;
  color: #000;
  padding: 0.5rem 1rem;
  margin: 5px 15px 5px 30px;
  width: 100px;
  border: 1px solid black;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ef8059;
  }
`;

export const GoBackButton = styled.button`
  background-color: #fafafc;
  color: #000;
  padding: 0.5rem 1rem;
  margin: 5px 15px 5px 30px;
  width: 100px;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #6fc6ff;
  }
`;

export const UpdateButtonStyled = styled.button`
  background-color: #fafafc;
  color: #000;
  padding: 0.5rem 1rem;
  margin: 5px 15px 5px 30px;
  width: 100px;
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #48e68b;
  }
`;

export const WorkScheduleLink = styled(Link)`
  background-color: #fafafc;
  color: #000;
  padding: 0.5rem 1rem;
  margin: 5px 15px 5px 30px;
  width: 100px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ffcc00;
  }
`;
