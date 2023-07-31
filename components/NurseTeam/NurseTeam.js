import useSWR from "swr";
import {
  StyledHeading,
  StyledList,
  StyledListContainer,
  StyledListItem,
} from "./NurseTeam.styled";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const ButtonStyled = styled.button`

background-color: #FFE6BE;
color: #000;
padding: 0.8rem 1.2rem;
margin: 0% 90%;
width: 100px;
border: none;
border-radius: 10%;
font-weight: bold;
cursor: pointer;
transition: 0.3s;
align-items: center;
justify-content:center;
  &:hover {
    background-color: #E37820;
  }
}
`;

const AddLinkStyled = styled(Link)`
  position: fixed;
  top: 10%;
  right: 30%;
  left: -40%;

  z-index: 999;
`;

export default function NurseTeam() {
  const { data, isLoading } = useSWR("/api/nurses");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <h1>You have no Team! 😩</h1>;
  }

  return (
    <>
      <StyledHeading>Available Nurses</StyledHeading>
      <AddLinkStyled href={"/addNurse"}>
        <ButtonStyled>Add Nurse</ButtonStyled>
      </AddLinkStyled>
      <StyledListContainer>
        <StyledList>
          {data.map((nurse) => (
            <StyledListItem key={nurse._id}>
              <Image
                width={76.8}
                height={76.8}
                src={nurse.image}
                alt="Random Nurse Photo"
              />
              <Link href={`/${nurse._id}`}>
                {nurse.name} <br /> {nurse.role}
              </Link>
            </StyledListItem>
          ))}
        </StyledList>
      </StyledListContainer>
    </>
  );
}
