import useSWR from "swr";
import {
  StyledHeading,
  StyledList,
  StyledListContainer,
  TeamContainer,
} from "./NurseTeam.styled";
import { useMemo, useState } from "react";
import SearchInput from "../SearchInput/SearchInput";
import NurseItem from "../NurseItem/NurseItem";
import LoaderSpinner from "../LoaderSpinner/AmbulanceLoading";
import Modal from "../Modals/Modal";
import WarningIcon from "@/utilities/Icons/WarningIcon";

export default function NurseTeam({ handleScheduleSubmit }) {
  const { data, isLoading } = useSWR("/api/nurses");
  const [search, setSearch] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [roleFilter, setRoleFilter] = useState("");

  const filteredNurses = useMemo(() => {
    if (!data) return [];
    return data.filter((nurse) => {
      const nurseName =
        search.toLowerCase() === "" ||
        nurse.name.toLowerCase().includes(search);
      const nurseRole =
        roleFilter === "" ||
        nurse.role.toLowerCase() === roleFilter.toLowerCase();
      return nurseName && nurseRole;
    });
  }, [data, search, roleFilter]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!data) {
    return (
      <>
        <Modal
          title="Error"
          IconComponent={WarningIcon}
          buttonText="Ok"
          buttonAction={() => {
            setShowErrorModal(false);
          }}
        >
          <p>You have no Team! 😩</p>
          <p>Please try again later</p>
        </Modal>{" "}
      </>
    );
  }

  return (
    <TeamContainer>
      <StyledHeading>Available Nurses</StyledHeading>
      <SearchInput
        onSearchChange={setSearch}
        onFilterChange={setRoleFilter}
        filterValue={roleFilter}
      />
      <StyledListContainer>
        <StyledList>
          {filteredNurses.length > 0 ? (
            filteredNurses.map((nurse) => (
              <NurseItem
                key={nurse._id}
                nurse={nurse}
                handleScheduleSubmit={handleScheduleSubmit}
              />
            ))
          ) : (
            <p>No nurses found for the given filters.</p>
          )}
        </StyledList>
      </StyledListContainer>
    </TeamContainer>
  );
}
