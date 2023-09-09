import NurseSelection from "../NurseSelection/NurseSelection";
import { useState } from "react";
import { Slot, NurseImage } from "./Dashboard.styled";
import Image from "next/image";

export default function NurseSlot({ currentNurse, onAddClick }) {
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
          </span>{" "}
        </Slot>
      ) : (
        <button onClick={onAddClick}>+</button>
      )}
    </div>
  );
}
