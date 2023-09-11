import { ShiftBox, Slot } from "./Dashboard.styled";
import { useState } from "react";
import NurseSlot from "./NurseSlot";
import NurseSelection from "../NurseSelection/NurseSelection";

export default function OneShift({
  shiftName,
  nursesList,
  shifts,
  onAddNurse,
  onAddClick,
  onRemoveNurse,
}) {
  const [selectedSlot, setSelectionSlot] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [showSpecialistsOnly, setShowSpecialistsOnly] = useState(false);

  function handleSlotClick(index) {
    setSelectionSlot(index);
  }

  function handleNurseSelection(nurseId) {
    onAddNurse(nurseId, shiftName);
    setSelectionSlot(null); //It should close the Selection after adding the nurse
  }

  return (
    <ShiftBox>
      {Array(5)
        .fill(null)
        .map((_, index) => {
          const currentNurse = shifts[shiftName]
            ? shifts[shiftName][index]
            : null;

          return (
            <div key={index}>
              <NurseSlot
                currentNurse={currentNurse}
                onAddClick={() => handleSlotClick(index)}
                onRemoveClick={() => onRemoveNurse(currentNurse._id, shiftName)}
              />
              {selectedSlot === index && (
                <NurseSelection
                  nursesList={nursesList}
                  selectedRole={selectedRole}
                  showSpecialistsOnly={showSpecialistsOnly}
                  setSelectedRole={setSelectedRole}
                  setShowSpecialistsOnly={setShowSpecialistsOnly}
                  onAddNurse={handleNurseSelection}
                  shiftName={shiftName}
                  setSelectionSlot={setSelectionSlot}
                />
              )}
            </div>
          );
        })}
    </ShiftBox>
  );
}
