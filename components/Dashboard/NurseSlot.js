import NurseSelection from "../NurseSelection/NurseSelection";
import { useState } from "react";
import { Slot } from "./Dashboard.styled";

export default function NurseSlot({
  nurse,
  onAddNurse,
  nursesList,
  onRemove,
  shiftType,
}) {
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  console.log("Nurse prop in NurseSlot:", nurse);
  console.log("NurseSlot", nursesList);

  if (!nurse) {
    return (
      <Slot>
        <button onClick={() => setIsSelectionOpen(!isSelectionOpen)}>+</button>
        {isSelectionOpen && (
          <NurseSelection
            nursesList={nursesList}
            shiftType={shiftType}
            onAddNurse={onAddNurse}
          />
        )}
      </Slot>
    );
  }

  return (
    <Slot>
      <button
        onClick={() => {
          setIsSelectionOpen(!isSelectionOpen);
        }}
      >
        {isSelectionOpen ? "-" : "+"}
      </button>
      {isSelectionOpen && (
        <NurseSelection
          nursesList={nursesList}
          shiftType={shiftType}
          onAddNurse={onAddNurse}
        />
      )}
    </Slot>
  );
}
