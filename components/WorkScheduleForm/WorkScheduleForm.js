import { useState } from "react";
import { ScheduleFormContainer } from "./WorkScheduleForm.styled";
import DatePickerRange from "../DatePicker/DatePickerRange";
import { Botton } from "./WorkScheduleForm.styled";

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
        <h2>Schedule your vacations:</h2>
        <DatePickerRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
        />
        <Botton type="submit">Request your Vacation</Botton>
      </ScheduleFormContainer>
    </>
  );
}
