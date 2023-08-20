import { useState } from "react";
import { ScheduleFormContainer } from "./WorkScheduleForm.styled";
import DatePickerRange from "../DatePicker/DatePickerRange";

export default function WorkScheduleForm({ onScheduleSubmit }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  function handleDateChange(newDateRange) {
    setStartDate(newDateRange[0]);
    setEndDate(newDateRange[1]);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const formWorkData = { vacationDates: [{ startDate, endDate }] };
    onScheduleSubmit(formWorkData);
  }

  return (
    <>
      <ScheduleFormContainer onSubmit={handleSubmit}>
        <h3>Your Vacations:</h3>
        <DatePickerRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
        />
        <button type="submit">Submit</button>
      </ScheduleFormContainer>
    </>
  );
}
