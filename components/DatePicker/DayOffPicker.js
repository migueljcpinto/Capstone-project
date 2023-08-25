import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DayOffPicker({ daysOff, onDateChange }) {
  const today = new Date();
  const nextMonthLastDate = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    0
  );
  const [selectedDates, setSelectedDates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  //checks if the date has already been selected.
  //If so, it removes the date from the list. And can not selecte more than 5 dates.
  function handleDateChange(date) {
    let newDates;
    if (selectedDates.includes(date)) {
      newDates = selectedDates.filter((d) => d !== date);
    } else if (selectedDates.length < 5) {
      newDates = [...selectedDates, date];
    } else {
      return; // Don't add more than 5 dates
    }
    setSelectedDates(newDates);
    onDateChange(newDates);
  }

  function handleClick(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  function handleReset() {
    setSelectedDates(null);
  }

  return (
    <>
      <button
        type="button"
        className="example-custom-input"
        onClick={handleClick}
      >
        {isOpen ? "Ok" : "Days-Off"}
      </button>
      {isOpen && (
        <DatePicker
          inline
          selected={null}
          onChange={handleDateChange}
          highlightDates={selectedDates}
          placeholderText="Select Days-Off"
          minDate={today}
          maxDate={nextMonthLastDate}
          shouldCloseOnSelect={false}
        >
          <p style={{ color: "green" }}>
            You can only add to 5 days off per month.
          </p>
          <p>
            You have selected {selectedDates ? selectedDates.length : 0}{" "}
            days-off.
          </p>
          <button type="button" onClick={handleReset}>
            Reset Selection
          </button>
        </DatePicker>
      )}
    </>
  );
}
