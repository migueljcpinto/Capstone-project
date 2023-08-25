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

    if (
      !startDate ||
      !endDate ||
      new Date(startDate).getFullYear() === 1970 ||
      new Date(endDate).getFullYear() === 1970 ||
      daysOff.length === 0
    ) {
      alert("Por favor, selecione datas válidas antes de enviar.");
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
