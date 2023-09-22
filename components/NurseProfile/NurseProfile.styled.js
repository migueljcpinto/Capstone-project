import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const NurseProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafc;
  padding: 2rem;
  max-width: 500px;
  height: 600px;
  margin: 0 auto;
  text-align: center;
`;

export const NurseProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
`;

export const NurseInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
  & h4 {
    margin: 35px 35px 0px 35px;
  }
`;

export const NurseImage = styled(Image)`
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export const ContactsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  & a {
    margin: 0.5rem;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
  align-items: center;
`;

export const InfoActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

export const DeleteButtonStyled = styled.button`
  background-color: #ef8059;
  color: #000;
  padding: 0.5rem 1rem;
  margin: 5px 15px 5px 30px;
  width: 100px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

export const UpdateButtonStyled = styled.button`
  background-color: #48e68b;
  color: #000;
  padding: 0.5rem 1rem;
  margin: 5px 15px 5px 30px;
  width: 100px;
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
  font-size: 16px;
`;

export const WorkScheduleLink = styled(Link)`
  background-color: #ffcc00;
  color: #000;
  padding: 0.5rem 1rem;
  margin: 5px 15px 5px 30px;
  width: 100px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
`;

export const ReturnContainer = styled.div`
  position: absolute;
  left: 20px;
`;
