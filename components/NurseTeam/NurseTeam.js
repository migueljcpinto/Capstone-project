import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { StyledHeading, StyledList } from "./NurseTeam.styled";

export default function NurseTeam() {
  const { data, error } = useSWR("/api/nurses", fetcher);
  const [nurses, setNurses] = useState([]);

  useEffect(() => {
    if (data) {
      setNurses(data);
    }
  }, [data]);

  if (error) {
    return <h1>Error loading data</h1>;
  }

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <StyledHeading>Available Nurses</StyledHeading>
      <StyledList>
        {nurses.map((nurse) => (
          <li key={nurse._id}>
            <p>
              {nurse.firstName} {nurse.lastName}
            </p>
            <Link href={`/${nurse._id}`}>{nurse._id}</Link>
          </li>
        ))}
      </StyledList>
    </>
  );
}

// Helper function to fetch data
const fetcher = (url) => fetch(url).then((res) => res.json());
