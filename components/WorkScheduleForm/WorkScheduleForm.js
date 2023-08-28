import { useState } from "react";
import { ScheduleFormContainer } from "./WorkScheduleForm.styled";
import DatePickerRange from "../DatePicker/DatePickerRange";
import { Button } from "./WorkScheduleForm.styled";
import DayOffPicker from "../DatePicker/DayOffPicker";
import { isValid } from "date-fns";

export default function WorkScheduleForm({
  onScheduleSubmit,
  onVacationSubmit,
  onDaysOffSubmit,
  daysOff,
  setDaysOff,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function handleDateChange(newDateRange) {
    setStartDate(newDateRange[0]);
    setEndDate(newDateRange[1]);
  }
  function handleVacationSubmit(event) {
    event.preventDefault();
    const formVacationData = {
      vacationDates: [{ startDate, endDate }],
    };
    console.log("Submitting vacation dates:", formVacationData);
    onVacationSubmit(formVacationData);
    setStartDate(null);
    setEndDate(null);
  }

  function handleDaysOffSubmit(event) {
    event.preventDefault();
    const formDaysOffData = {
      daysOff: daysOff,
    };
    console.log("Submitting days off:", formDaysOffData);
    onDaysOffSubmit(formDaysOffData);
  }
  return (
    <>
      <ScheduleFormContainer>
        <h3>Schedule your vacations and Days-Off:</h3>
        <DatePickerRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
        />
        <Button onClick={handleVacationSubmit}>Request Vacation Dates</Button>
        <DayOffPicker
          daysOff={daysOff}
          onDateChange={(newDates) => {
            setDaysOff(newDates);
          }}
        />
        <Button onClick={handleDaysOffSubmit}>Request Days Off</Button>
      </ScheduleFormContainer>
    </>
  );
}
