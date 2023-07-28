import useSWR from "swr";
import {
  StyledHeading,
  StyledList,
  StyledListContainer,
  StyledListItem,
} from "./NurseTeam.styled";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function NurseTeam() {
  const { data, isLoading } = useSWR("/api/nurses", fetcher);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <h1>You have no Team! 😩</h1>;
  }

  return (
    <>
      <StyledHeading>Available Nurses</StyledHeading>
      <StyledListContainer>
        <StyledList>
          {data.map((nurse) => (
            <StyledListItem key={nurse}>
              {nurse.name} <br /> {nurse.role}
            </StyledListItem>
          ))}
        </StyledList>
      </StyledListContainer>
    </>
  );
}
