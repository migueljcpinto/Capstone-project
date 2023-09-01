import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addMonths, endOfMonth } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

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
  function handleShiftChange(e) {
    const shift = e.target.value;
    setSelectedShift(shift);
    if (onShiftChange) {
      onShiftChange(shift);
    }
  }

  return (
    <>
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          minDate={minDate}
          maxDate={maxDate}
          excludeDates={excludeDates}
        ></DatePicker>

        <select value={selectedShift} onChange={handleShiftChange}>
          <option value="" disabled>
            Select a shift
          </option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="night">Night</option>
        </select>
      </div>
    </>
  );
}
