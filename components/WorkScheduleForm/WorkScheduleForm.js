import { useState } from "react";
import { ScheduleFormContainer } from "./WorkScheduleForm.styled";
import DatePickerRange from "../DatePicker/DatePickerRange";
import { Button } from "./WorkScheduleForm.styled";
import DayOffPicker from "../DatePicker/DayOffPicker";

export default function WorkScheduleForm({
  onScheduleSubmit,
  daysOff,
  setDaysOff,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  function handleDateChange(newDateRange) {
    setStartDate(newDateRange[0]);
    setEndDate(newDateRange[1]);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const formWorkData = {
      vacationDates: [{ startDate, endDate }],
      daysOff: daysOff,
    };
    console.log("Form data being sent:", formWorkData);

    onScheduleSubmit(formWorkData);
  }

  return (
    <>
      <ScheduleFormContainer onSubmit={handleSubmit}>
        <h3>Schedule your vacations and Days-Off:</h3>
        <DatePickerRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
        />

        <DayOffPicker
          daysOff={daysOff}
          onDateChange={(newDates) => {
            setDaysOff(newDates);
          }}
        />
        <Button type="submit">Request your Schedule</Button>
      </ScheduleFormContainer>
    </>
  );
}
