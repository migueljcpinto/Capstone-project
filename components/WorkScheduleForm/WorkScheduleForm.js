import { useState } from "react";
import { ScheduleFormContainer } from "./WorkScheduleForm.styled";
import DatePickerRange from "../DatePicker/DatePickerRange";
import { Button } from "./WorkScheduleForm.styled";
import DayOffPicker from "../DatePicker/DayOffPicker";
import { isValid } from "date-fns";

export default function WorkScheduleForm({
  onScheduleSubmit,
  daysOff,
  setDaysOff,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

    // checking if dates are valid
    if (
      !isValid(new Date(startDate)) ||
      !isValid(new Date(endDate)) ||
      daysOff.some((date) => !isValid(new Date(date)))
    ) {
      alert("Please, select valid dates before submit.");
      return;
    }

    // Check that the standard Unix dates are being used
    if (
      new Date(startDate).getTime() === 0 ||
      new Date(endDate).getTime() === 0
    ) {
      alert("Please select valid dates before sending.");
      return;
    }

    onScheduleSubmit(formWorkData);
    setStartDate(null);
    setEndDate(null);
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
