import { useState } from "react";
import DatePicker from "react-datepicker";

export default function DatePickerRange({ startDate, endDate, onChange }) {
  const [dateRange, setDateRange] = useState([startDate, endDate]);

  //updating the state of this component
  function handleDateChange(update) {
    setDateRange(update);
    onChange(update);
  }

  return (
    <DatePicker
      selectsRange={true}
      dateFormat="dd/MM/yyyy"
      startDate={dateRange[0]}
      endDate={dateRange[1]}
      onChange={handleDateChange}
      isClearable={true}
      placeholderText="Choose your dates"
    />
  );
}
