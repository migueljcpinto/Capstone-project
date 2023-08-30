import { useState, useEffect } from "react";
import { ScheduleFormContainer } from "./WorkScheduleForm.styled";
import DatePickerRange from "../DatePicker/DatePickerRange";
import { Button } from "./WorkScheduleForm.styled";
import DayOffPicker from "../DatePicker/DayOffPicker";
import fetcher from "@/utilities/fetcher";
import useSWR from "swr";

export default function WorkScheduleForm({
  onVacationSubmit,
  onDaysOffSubmit,
  daysOff,
  setDaysOff,
  nurseId,
  nurseData,
}) {
  const [allDates, setAllDates] = useState([]);

  const { data: absencesFromDB, error } = useSWR(
    nurseId ? `/api/absences/${nurseId}` : null,
    fetcher
  );

  if (error) console.error("Error searching the blocked dates:", error);

  const excludeDatesList = [
    ...daysOff,
    ...allDates,
    ...(absencesFromDB || []).map((dateObj) => new Date(dateObj.date)),
  ];

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

  function handleDaysOffSubmit(event) {
    event.preventDefault();
    const formDaysOffData = {
      daysOff: daysOff,
    };
    onDaysOffSubmit(formDaysOffData);
    setDaysOff([]);
  }

  return (
    <>
      <ScheduleFormContainer>
        <h3>Schedule your vacations and Days-Off:</h3>
        <DatePickerRange
          onChange={handleDateChange}
          excludeDates={excludeDatesList}
        />
        <Button onClick={handleVacationSubmit}>Request Vacation Dates</Button>
        <DayOffPicker
          daysOff={daysOff}
          excludeDates={excludeDatesList}
          onDateChange={(newDates) => {
            setDaysOff(newDates);
          }}
        />
        <Button onClick={handleDaysOffSubmit}>Request Days Off</Button>
      </ScheduleFormContainer>
    </>
  );
}
