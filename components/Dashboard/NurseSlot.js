import { Slot } from "./Dashboard.styled";

export default function NurseSlot({ nurse, onAdd, onRemove }) {
  if (!nurse) {
    return (
      <Slot>
        <button onClick={onAdd}>+</button>
      </Slot>
    );
  }
  console.log("Nurse prop in NurseSlot:", nurse);

  return (
    <Slot>
      {nurse.name}
      <button onClick={() => onRemove(nurse.id)}>Remove</button>
    </Slot>
  );
}
