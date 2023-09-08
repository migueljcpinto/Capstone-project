import { ShiftBox } from "./Dashboard.styled";
import NurseSlot from "./NurseSlot";

export default function OneShift({
  shiftName,
  nursesList,
  shifts,
  onAddNurse,
  onAddClick,
  onRemoveNurse,
}) {
  console.log("nursesList in OneShift:", nursesList);
  console.log("OneShift nurse", shifts, shiftName);

  return (
    <ShiftBox>
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <NurseSlot
            key={`${shiftName}-${index}`}
            nurse={
              shifts && shiftName && shifts[shiftName]
                ? shifts[shiftName][index]
                : null
            }
            onAdd={() => handleAddClick(shiftName)}
            onRemove={onRemoveNurse}
            shiftType={shiftName}
            nursesList={nursesList}
            onAddNurse={onAddNurse}
          />
        ))}
    </ShiftBox>
  );
}
