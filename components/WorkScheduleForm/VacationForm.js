import { useState } from "react";
import DatePickerRange from "../DatePicker/DatePickerRange";
import { Button, ScheduleFormContainer } from "./WorkScheduleForm.styled";

export default function VacationForm({
  onVacationSubmit,
  excludeDates,
  nurseId,
}) {
  const [allDates, setAllDates] = useState([]);

  function handleDateChange(dates) {
    setAllDates(dates);
  }

  function handleVacationSubmit(event) {
    event.preventDefault();

    if (allDates.length) {
      const formVacationData = {
        vacationDates: allDates,
      };
      onVacationSubmit(formVacationData);
      setAllDates([]);
    }
  }
  return (
    <>
      <ScheduleFormContainer>
        <DatePickerRange
          onChange={handleDateChange}
          excludeDates={excludeDates}
        />
        <Button onClick={handleVacationSubmit}>Request Vacation Dates</Button>
      </ScheduleFormContainer>
    </>
  );
}
