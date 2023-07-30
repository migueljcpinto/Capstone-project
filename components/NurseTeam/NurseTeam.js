import useSWR from "swr";
import {
  StyledHeading,
  StyledList,
  StyledListContainer,
  StyledListItem,
} from "./NurseTeam.styled";
import Link from "next/link";
import Button from "../Button/Button";

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
      <Button />
      <StyledListContainer>
        <StyledList>
          {data.map((nurse) => (
            <StyledListItem key={nurse._id}>
              <img src={nurse.image} alt="Random Nurse Photo" />
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
