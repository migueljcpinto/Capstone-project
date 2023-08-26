import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eachDayOfInterval, isValid } from "date-fns";

export default function DatePickerRange({ startDate, endDate, onChange }) {
  const [dateRange, setDateRange] = useState([startDate, endDate]);
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const nextMonthLastDate = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    0
  );
  const [selectedDateRanges, setSelectedDateRanges] = useState([]);

  //updating the state of this component
  function handleDateChange(update) {
    setDateRange(update);
    setSelectedDateRanges((prevRanges) => [...prevRanges, update]);
    onChange(update);
  }

  function handleClick(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }
  function handleReset() {
    setDateRange([]);
  }
  return (
    <>
      <button
        type="button"
        className="example-custom-input"
        onClick={handleClick}
      >
        {isOpen ? "Ok" : "Vacations"}
      </button>
      {isOpen && (
        <DatePicker
          inline
          selectsRange={true}
          dateFormat="dd/MM/yyyy"
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          minDate={today}
          maxDate={nextMonthLastDate}
          onChange={handleDateChange}
          placeholderText="Choose your dates"
          excludeDates={selectedDateRanges.flatMap((range) => {
            const start = new Date(range[0]);
            const end = new Date(range[1]);
            if (isValid(start) && isValid(end) && start <= end) {
              return eachDayOfInterval({ start, end });
            }
            return [];
          })}
        >
          <button type="button" onClick={handleReset}>
            Reset Selection
          </button>
        </DatePicker>
      )}
    </>
  );
}
