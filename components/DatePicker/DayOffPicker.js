import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StyledParagraph } from "./DatePicker.styled";

export default function DayOffPicker({ daysOff, onDateChange, excludeDates }) {
  const today = new Date();
  const nextMonthLastDate = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    0
  );
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    if (daysOff.length === 0) {
      setSelectedDates([]);
    }
  }, [daysOff]);

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

  function handleReset() {
    setSelectedDates([]);
  }
  return (
    <>
      <DatePicker
        inline
        selected={null}
        onChange={handleDateChange}
        highlightDates={selectedDates.map((d) => new Date(d))}
        placeholderText="Select Days-Off"
        minDate={today}
        maxDate={nextMonthLastDate}
        shouldCloseOnSelect={false}
        excludeDates={excludeDates.map((date) => new Date(date))}
      >
        <StyledParagraph>
          You can only add to 5 days off per month.
        </StyledParagraph>
        <p>
          You have selected {selectedDates ? selectedDates.length : 0} days-off.
        </p>
        <button type="button" onClick={handleReset}>
          Reset Selection
        </button>
      </DatePicker>
    </>
  );
}
