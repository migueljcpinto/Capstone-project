import useSWR from "swr";
import {
  StyledHeading,
  StyledList,
  StyledListContainer,
  StyledListItem,
  ButtonStyled,
  AddLinkStyled,
} from "./NurseTeam.styled";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

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
              <Link
                style={{ color: "black", textDecoration: "none" }}
                href={`/${nurse._id}`}
              >
                {nurse.name} <br /> {nurse.role}
              </Link>
            </StyledListItem>
          ))}
        </StyledList>
      </StyledListContainer>
    </>
  );
}
