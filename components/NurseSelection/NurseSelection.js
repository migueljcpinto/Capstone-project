import { useState } from "react";
import {
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
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
}) {
  let filteredNurses = [...nursesList];

  if (selectedRole) {
    filteredNurses = filteredNurses.filter(
      (nurse) => nurse.role === selectedRole
    );
  }

  if (showSpecialistsOnly) {
    filteredNurses = filteredNurses.filter((nurse) => nurse.specialist);
  }

  return (
    <ModalOverlay onClick={() => setSelectionSlot(null)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={() => setSelectionSlot(null)}>
          &times;
        </ModalCloseButton>
        <div>
          <label>Filter by Role:</label>
          <select
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
        <ul>
          {filteredNurses.map((nurse) => (
            <li key={nurse._id}>
              {nurse.name}
              {nurse.role}
              <button
                onClick={() => {
                  onAddNurse(nurse._id, shiftName);
                }}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </ModalContent>
    </ModalOverlay>
  );
}
