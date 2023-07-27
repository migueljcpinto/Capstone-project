import { useEffect, useState } from "react";
import useSWR from "swr";
import { StyledHeading, StyledList, StyledListItem } from "./NurseTeam.styled";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function NurseTeam() {
  const { data, error } = useSWR("/api/nurses", fetcher);
  const [nurses, setNurses] = useState([]);

  useEffect(() => {
    if (data) {
      setNurses(data);
    }
  }, [data]);

  if (error) {
    return <h1>You have no Team! 😩</h1>;
  }

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <StyledHeading>Available Nurses</StyledHeading>
      <StyledList>
        {nurses.map((nurse) => (
          <StyledListItem key={nurse._id}>
            {nurse.firstName} {nurse.lastName}
            <br />
            {nurse.role}
          </StyledListItem>
        ))}
      </StyledList>
    </>
  );
}
