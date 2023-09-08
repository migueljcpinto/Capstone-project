import { useState, useEffect } from "react";
import {
  ShiftsContainer,
  MorningShiftAccordion,
  AfternoonShiftAccordion,
  NightShiftAccordion,
} from "@/components/Dashboard/Dashboard.styled";
import NurseSlot from "./NurseSlot";
import OneShift from "./OneShift";

export default function ShiftDetails({
  shifts,
  onAddNurse,
  onRemoveNurse,
  nurseId,
}) {
  const [currentShiftType, setCurrentShiftType] = useState(null);
  const [nursesList, setNursesList] = useState([]);

  useEffect(() => {
    async function fetchNurses() {
      try {
        const response = await fetch("/api/nurses");
        const data = await response.json();
        setNursesList(data);
      } catch (error) {
        console.error("Error fetching nurses:", error);
      }
    }

    fetchNurses();
  }, []);

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
