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
import { useState } from "react";
import SearchInput from "../SearchInput/SearchInput";

export default function NurseTeam() {
  const { data, isLoading } = useSWR("/api/nurses");
  const [search, setSearch] = useState("");

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
      {/* passing the callback */}
      <SearchInput onSearchChange={setSearch} />
      <StyledListContainer>
        <StyledList>
          {data
            .filter((nurse) => {
              return search.toLowerCase() === ""
                ? nurse
                : nurse.name.toLowerCase().includes(search); //Converting again to compare
            })
            .map((nurse) => (
              <StyledListItem key={nurse._id}>
                <Image
                  width={76.8}
                  height={76.8}
                  src={nurse.image}
                  alt="Random Nurse Photo"
                />
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  href={`/NursePage?id=${nurse._id}`}
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
