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
  return (
    <ShiftBox>
      {Array(5)
        .fill(null)
        .map((_, index) => {
          const nurseId =
            shifts && shiftName && shifts[shiftName]
              ? shifts[shiftName][index]
              : null;
          const nurseObject = nursesList.find((n) => n._id === nurseId);
          console.log("Nurse object for slot:", nurseObject);
          return (
            <NurseSlot
              key={`${shiftName}-${index}`}
              nurse={nurseObject}
              onAdd={() => handleAddClick(shiftName)}
              onRemove={onRemoveNurse}
              shiftType={shiftName}
              nursesList={nursesList}
              onAddNurse={onAddNurse}
            />
          );
        })}
    </ShiftBox>
  );
}
