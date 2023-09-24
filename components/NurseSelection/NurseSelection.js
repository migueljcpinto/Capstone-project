import { useMemo, useState } from "react";
import { ButtonSlot, NurseImage, Slot } from "../Dashboard/Dashboard.styled";
import {
  FilterSelection,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  FilteredList,
} from "./NurseSelection.styled";

export default function NurseSelection({
  nursesList,
  selectedRole,
  showSpecialistsOnly,
  setSelectedRole,
  setShowSpecialistsOnly,
  onAddNurse,
  shiftName,
  setSelectionSlot,
  shifts,
}) {
  const assignedNurseIds = [
    ...shifts.morningShift,
    ...shifts.afternoonShift,
    ...shifts.nightShift,
  ].map((nurse) => nurse._id);

  const filteredNurses = useMemo(() => {
    let result = nursesList.filter(
      (nurse) => !assignedNurseIds.includes(nurse._id)
    );
    if (selectedRole) {
      result = result.filter(
        (nurse) => nurse.role.toLowerCase() === selectedRole.toLowerCase()
      );
    }
    if (showSpecialistsOnly) {
      result = result.filter((nurse) => nurse.specialist);
    }
    return result;
  }, [nursesList, selectedRole, showSpecialistsOnly, assignedNurseIds]);

  return (
    <ModalOverlay onClick={() => setSelectionSlot(null)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={() => setSelectionSlot(null)}>
          &times;
        </ModalCloseButton>
        <form>
          <FilterSelection>
            <div>
              <label htmlFor="roleFilter">Filter by Role:</label>
              <select
                id="roleFilter"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">All</option>
                <option value="nurse">Nurse</option>
                <option value="chief">Chief</option>
                <option value="sub-chief">Sub-Chief</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>{" "}
              </select>
            </div>
            <div>
              <label>Show only specialists:</label>
              <input
                type="checkbox"
                checked={showSpecialistsOnly}
                onChange={(e) => setShowSpecialistsOnly(e.target.checked)}
              />
            </div>
          </FilterSelection>
        </form>
        <FilteredList>
          {filteredNurses.length > 0 ? (
            filteredNurses.map((nurse) => (
              <Slot key={nurse._id}>
                {" "}
                <NurseImage
                  width={42}
                  height={42}
                  src={nurse.image}
                  alt={`${nurse.name} Nurse Photo`}
                />
                <span>
                  <h4>{nurse.name}</h4>
                  <h5>{nurse.role}</h5>
                </span>
                <ButtonSlot
                  onClick={() => {
                    onAddNurse(nurse._id, shiftName);
                  }}
                >
                  Add
                </ButtonSlot>
              </Slot>
            ))
          ) : (
            <p>No nurses found based on the selected filters.</p>
          )}
        </FilteredList>
      </ModalContent>
    </ModalOverlay>
  );
}
