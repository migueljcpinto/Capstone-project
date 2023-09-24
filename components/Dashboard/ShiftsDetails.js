import { useState } from "react";
import useSWR from "swr";
import {
  ShiftsContainer,
  MorningShiftAccordion,
  AfternoonShiftAccordion,
  NightShiftAccordion,
} from "@/components/Dashboard/Dashboard.styled";
import OneShift from "./OneShift";

export default function ShiftDetails({
  shifts,
  onAddNurse,
  onRemoveNurse,
  nurseId,
  onAccordionToggle,
  openAccordion,
}) {
  const [currentShiftType, setCurrentShiftType] = useState(null);

  const { data: nursesList, error } = useSWR("/api/nurses");

  if (error) {
    console.error("Error fetching nurses:", error);
  }

  function handleAddClick(shiftType) {
    setCurrentShiftType(shiftType);
  }

  return (
    <ShiftsContainer>
      <MorningShiftAccordion
        title={
          <>
            Morning Shift
            <span>06:00 - 14:30</span>
          </>
        }
        isOpen={openAccordion === 1}
        onToggle={() => onAccordionToggle(1)}
      >
        <OneShift
          shiftName="morningShift"
          nursesList={nursesList}
          shifts={shifts}
          onAddNurse={onAddNurse}
          onAddClick={handleAddClick}
          onRemoveNurse={onRemoveNurse}
        />
      </MorningShiftAccordion>
      <AfternoonShiftAccordion
        title={
          <>
            Afternoon Shift
            <span>14:00 - 21:30</span>
          </>
        }
        isOpen={openAccordion === 2}
        onToggle={() => onAccordionToggle(2)}
      >
        {" "}
        <OneShift
          shiftName="afternoonShift"
          nursesList={nursesList}
          shifts={shifts}
          onAddNurse={onAddNurse}
          onAddClick={handleAddClick}
          onRemoveNurse={onRemoveNurse}
        />{" "}
      </AfternoonShiftAccordion>
      <NightShiftAccordion
        title={
          <>
            Night Shift
            <span>21:00 - 06:30</span>
          </>
        }
        isOpen={openAccordion === 3}
        onToggle={() => onAccordionToggle(3)}
      >
        <OneShift
          shiftName="nightShift"
          nursesList={nursesList}
          shifts={shifts}
          onAddNurse={onAddNurse}
          onAddClick={handleAddClick}
          onRemoveNurse={onRemoveNurse}
        />{" "}
      </NightShiftAccordion>{" "}
    </ShiftsContainer>
  );
}
