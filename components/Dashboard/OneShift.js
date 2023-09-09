import { ShiftBox, Slot } from "./Dashboard.styled";
import { useState } from "react";

export default function OneShift({
  shiftName,
  nursesList,
  shifts,
  onAddNurse,
  onAddClick,
  onRemoveNurse,
}) {
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [showSpecialistsOnly, setShowSpecialistsOnly] = useState(false);

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
    <ShiftBox>
      {Array(5)
        .fill(null)
        .map((_, index) => {
          const currentNurse = shifts[shiftName]
            ? shifts[shiftName][index]
            : null;

          if (!currentNurse) {
            return (
              <Slot key={index}>
                <button onClick={() => setIsSelectionOpen(!isSelectionOpen)}>
                  +
                </button>
                {isSelectionOpen && (
                  <div>
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
                        onChange={(e) =>
                          setShowSpecialistsOnly(e.target.checked)
                        }
                      />
                    </div>
                    <ul>
                      {filteredNurses.map((nurse) => (
                        <li key={nurse._id}>
                          {nurse.name}
                          <button
                            onClick={() => {
                              onAddNurse(nurse._id, shiftName);
                              setIsSelectionOpen(false);
                            }}
                          >
                            Add
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Slot>
            );
          } else {
            return (
              <Slot key={index}>
                <button onClick={() => setIsSelectionOpen(!isSelectionOpen)}>
                  {currentNurse.name}
                </button>
              </Slot>
            );
          }
        })}
    </ShiftBox>
  );
}
