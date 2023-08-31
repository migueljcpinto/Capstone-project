import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addMonths, endOfMonth } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

export function AvailabilityDatePicker({
  onDateChange,
  onShiftChange,
  excludeDates,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedShift, setSelectedShift] = useState("");

  const minDate = new Date();
  const maxDate = endOfMonth(addMonths(new Date(), 1));

  function handleClick(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (onDateChange) {
      onDateChange(selectedDate);
    }
    if (onShiftChange) {
      onShiftChange(selectedShift);
    }
  }, [selectedDate, selectedShift]);

  return (
    <>
      <button type="button" onClick={handleClick}>
        {isOpen ? "Ok" : "Availability"}
      </button>
      {isOpen && (
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={minDate}
            maxDate={maxDate}
            excludeDates={excludeDates}
          ></DatePicker>

          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
          >
            <option value="" disabled>
              Select a shift
            </option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
          </select>
        </div>
      )}
    </>
  );
}
