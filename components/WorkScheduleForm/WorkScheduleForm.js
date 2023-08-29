import { useState, useEffect } from "react";
import { ScheduleFormContainer } from "./WorkScheduleForm.styled";
import DatePickerRange from "../DatePicker/DatePickerRange";
import { Button } from "./WorkScheduleForm.styled";
import DayOffPicker from "../DatePicker/DayOffPicker";

export default function WorkScheduleForm({
  onVacationSubmit,
  onDaysOffSubmit,
  daysOff,
  setDaysOff,
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
      console.log("Submitting vacation dates:", formVacationData);
      onVacationSubmit(formVacationData);
      setAllDates([]);
    }
  }

  function handleDaysOffSubmit(event) {
    event.preventDefault();
    const formDaysOffData = {
      daysOff: daysOff,
    };
    console.log("Submitting days off:", formDaysOffData);
    onDaysOffSubmit(formDaysOffData);
  }

  useEffect(() => {
    console.log("All dates:", allDates);
  }, [allDates]);

  return (
    <>
      <ScheduleFormContainer>
        <h3>Schedule your vacations and Days-Off:</h3>
        <DatePickerRange
          onChange={handleDateChange}
          excludeDates={[...daysOff, ...allDates]}
        />
        <Button onClick={handleVacationSubmit}>Request Vacation Dates</Button>
        <DayOffPicker
          daysOff={daysOff}
          excludeDates={[...allDates, ...daysOff]}
          onDateChange={(newDates) => {
            setDaysOff(newDates);
          }}
        />
        <Button onClick={handleDaysOffSubmit}>Request Days Off</Button>
      </ScheduleFormContainer>
    </>
  );
}
