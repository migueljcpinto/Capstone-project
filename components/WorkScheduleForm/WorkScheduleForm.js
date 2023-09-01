import { useState, useEffect } from "react";
import { ScheduleFormContainer, Button } from "./WorkScheduleForm.styled";
import DatePickerRange from "../DatePicker/DatePickerRange";
import DayOffPicker from "../DatePicker/DayOffPicker";
import fetcher from "@/utilities/fetcher";
import useSWR from "swr";
import { AvailabilityDatePicker } from "../DatePicker/AvailabilityDatePicker";

export default function WorkScheduleForm({
  onVacationSubmit,
  onDaysOffSubmit,
  onAvailabilitySubmit,
  daysOff,
  setDaysOff,
  nurseId,
  nurseData,
}) {
  const [allDates, setAllDates] = useState([]);
  const [selectedAvailabilityDate, setSelectedAvailabilityDate] =
    useState(null);
  const [selectedShift, setSelectedShift] = useState("");
  const [resetAvailability, setResetAvailability] = useState(false);

  const { data: absencesFromDB, error: absenceError } = useSWR(
    nurseId ? `/api/absences/${nurseId}` : null,
    fetcher
  );
  const { data: availabilityData, error: availabilityError } = useSWR(
    nurseId ? `/api/availability/${nurseId}` : null,
    fetcher
  );

  if (absenceError)
    console.error("Error searching the blocked dates:", absenceError);
  if (availabilityError)
    console.error("Error fetching availability:", availabilityError);

  const allAbsenceDates = absencesFromDB
    ? absencesFromDB.flatMap((absence) => absence.date)
    : [];
  const allAvailabilityDates = availabilityData
    ? availabilityData.map((availability) => availability.date)
    : [];

  const excludeDatesList = [
    ...daysOff,
    ...allDates,
    ...allAbsenceDates,
    ...allAvailabilityDates,
  ].map((dateStr) => new Date(dateStr));

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

  async function handleAvailabilitySubmit(event) {
    event.preventDefault();
    if (!selectedShift) {
      alert("Please select a shift before submitting.");
      return;
    }
    if (selectedAvailabilityDate && selectedShift) {
      const formAvailabilityData = {
        availability: {
          date: selectedAvailabilityDate,
          shift: selectedShift,
        },
      };
      console.log("Sending availability data:", formAvailabilityData);
      const response = await onAvailabilitySubmit(formAvailabilityData);

      if (response && response.ok) {
        setSelectedAvailabilityDate(null);
        setSelectedShift("");
        setResetAvailability(true);
      } else {
        const errorData = await response.json();
        if (errorData.error === "You can only have 5 availabilities.") {
          alert("You have already added 5 availabilities. You can't add more.");
        } else {
          console.error("Please select a date and a shift for availability.");
        }
      }
    }
  }

  useEffect(() => {
    if (resetAvailability) {
      setResetAvailability(false);
    }
  }, [resetAvailability]);
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
        <AvailabilityDatePicker
          excludeDates={excludeDatesList}
          onDateChange={(date) => setSelectedAvailabilityDate(date)}
          onShiftChange={(shift) => setSelectedShift(shift)}
          reset={resetAvailability}
        />
        <Button onClick={handleAvailabilitySubmit} disabled={!selectedShift}>
          Request Availability
        </Button>
      </ScheduleFormContainer>
    </>
  );
}
