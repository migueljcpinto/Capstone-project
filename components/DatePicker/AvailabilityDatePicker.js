import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addMonths, endOfMonth } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import {
  ShiftOption,
  ShiftSelect,
  StyledDateContainer,
} from "../WorkScheduleForm/WorkScheduleForm.styled";

export function AvailabilityDatePicker({
  onDateChange,
  onShiftChange,
  excludeDates,
  reset,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedShift, setSelectedShift] = useState("");

  const minDate = new Date();
  const maxDate = endOfMonth(addMonths(new Date(), 1));

  useEffect(() => {
    if (reset) {
      setSelectedDate(null);
      setSelectedShift("");
    }
  }, [reset]);

  function handleDateChange(date) {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  }
  function handleShiftChange(event, shift) {
    event.preventDefault();
    setSelectedShift(shift);
    if (onShiftChange) {
      onShiftChange(shift);
    }
  }
  return (
    <>
      <DatePicker
        withPortal
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        minDate={minDate}
        maxDate={maxDate}
        excludeDates={excludeDates}
      ></DatePicker>

      <ShiftSelect>
        <ShiftOption
          isActive={selectedShift === "morning"}
          onClick={(e) => handleShiftChange(e, "morning")}
        >
          Morning
        </ShiftOption>
        <ShiftOption
          isActive={selectedShift === "afternoon"}
          onClick={(e) => handleShiftChange(e, "afternoon")}
        >
          Afternoon
        </ShiftOption>
        <ShiftOption
          isActive={selectedShift === "night"}
          onClick={(e) => handleShiftChange(e, "night")}
        >
          Night
        </ShiftOption>
      </ShiftSelect>
    </>
  );
}
