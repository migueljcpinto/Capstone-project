import { useState } from "react";
import {
  ShiftsContainer,
  ShiftBox,
  MorningShiftAccordion,
  AfternoonShiftAccordion,
  NightShiftAccordion,
} from "@/components/Dashboard/Dashboard.styled";
import SearchInput from "../SearchInput/SearchInput";
import NurseSlot from "./NurseSlot";

export default function ShiftDetails({
  shifts,
  onAddNurseClick,
  onRemoveNurse,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filteredNurses, setFilteredNurses] = useState([]);
  const [currentShiftType, setCurrentShiftType] = useState(null);

  function handleSearchChange(term) {
    setSearchTerm(term);
    fetch(`/api/nurses?search=${term}`)
      .then((response) => response.json())
      .then((data) => {
        setFilteredNurses(data);
        console.log("Filtered nurses:", data);
      })
      .catch((error) => {
        console.error("Error fetching filtered nurses:", error);
      });
  }

  function handleAddClick(shiftType) {
    console.log("Shift type on add click:", shiftType);

    setShowSearch(true);
    setCurrentShiftType(shiftType);
  }
  console.log("Morning shifts before rendering slots:", shifts.morning);

  return (
    <ShiftsContainer>
      {showSearch && (
        <>
          <SearchInput onSearchChange={handleSearchChange} />
          <div>
            {filteredNurses.map((nurse) => (
              <div key={nurse._id}>
                {nurse.name}
                <button
                  onClick={() => onAddNurseClick(nurse._id, currentShiftType)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      <MorningShiftAccordion
        title={
          <>
            Morning Shift
            <span>06:00 - 14:30</span>
          </>
        }
      >
        <ShiftBox>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <NurseSlot
                key={
                  shifts.morning[index]
                    ? shifts.morning[index].id
                    : `morning-${index}`
                }
                nurse={shifts.morning && shifts.morning[index]}
                onAdd={() => handleAddClick("morning")}
                onRemove={onRemoveNurse}
              />
            ))}
        </ShiftBox>
      </MorningShiftAccordion>
      <AfternoonShiftAccordion
        title={
          <>
            Afternoon Shift
            <span>14:00 - 21:30</span>
          </>
        }
      >
        <ShiftBox>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <NurseSlot
                key={
                  shifts.afternoon[index]
                    ? shifts.afternoon[index].id
                    : `afternoon-${index}`
                }
                nurse={shifts.afternoon && shifts.afternoon[index]}
                onAdd={() => handleAddClick("afternoon")}
                onRemove={onRemoveNurse}
              />
            ))}
        </ShiftBox>
      </AfternoonShiftAccordion>
      <NightShiftAccordion
        title={
          <>
            Night Shift
            <span>21:00 - 06:30</span>
          </>
        }
      >
        <ShiftBox>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <NurseSlot
                key={
                  shifts.night[index]
                    ? shifts.night[index].id
                    : `night-${index}`
                }
                nurse={shifts.night && shifts.night[index]}
                onAdd={() => handleAddClick("night")}
                onRemove={onRemoveNurse}
              />
            ))}
        </ShiftBox>
      </NightShiftAccordion>{" "}
    </ShiftsContainer>
  );
}
