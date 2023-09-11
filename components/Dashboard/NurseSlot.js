import AddNurseSVGIcon from "@/utilities/Icons/AddNurseSlotIcon";
import RemoveSVGIcon from "@/utilities/Icons/RemoveNurseSlotIcon";
import { Slot, NurseImage, ButtonSlot } from "./Dashboard.styled";

export default function NurseSlot({ currentNurse, onAddClick, onRemoveClick }) {
  return (
    <div>
      {currentNurse ? (
        <Slot>
          <NurseImage
            width={42}
            height={42}
            src={currentNurse.image}
            alt={`${currentNurse.name} Nurse Photo`}
          />
          <span>
            <h4>{currentNurse.name}</h4>
            <h5>{currentNurse.role}</h5>
          </span>
          <ButtonSlot onClick={onRemoveClick}>
            <RemoveSVGIcon />
          </ButtonSlot>
        </Slot>
      ) : (
        <Slot>
          <ButtonSlot onClick={onAddClick}>
            <AddNurseSVGIcon />
          </ButtonSlot>
        </Slot>
      )}
    </div>
  );
}
