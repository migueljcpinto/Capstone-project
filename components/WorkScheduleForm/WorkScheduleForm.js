import { useEffect, useState } from "react";
import {ScheduleFormContainer} from "./WorkScheduleForm.styled"
import DatePickerRange from "../DatePicker/DatePickerRange";


export default function WorkScheduleForm({ onScheduleSubmit, workDates}) {
    const [vacationDates, setVacationDates] = useState([]);

  useEffect(() => {
    if(workDates) {
      setVacationDates(workDates)
    }
  }, [workDates])
    
    // Adds a new date range to the dateRanges state array
    function handleAddDate() {
      const newDateRanges = [
        ...vacationDates,
        { startDate: new Date(), endDate: new Date() }, // set initial endDate to today too
      ];
      setVacationDates(newDateRanges);
    }
    
    function handleDateChange(index, [startDate, endDate]) {
      const updatedDateRanges = [...vacationDates];
      updatedDateRanges[index] = {startDate, endDate};
      setVacationDates(updatedDateRanges);
    }
    
    
    function handleRemoveDate(index) {
      const updatedDateRanges = vacationDates.filter((_, i) => i !== index);
      setVacationDates(updatedDateRanges);
    }
    
  function handleSubmit(event) {
      event.preventDefault();
      const formWorkData = {vacationDates};

      onScheduleSubmit(formWorkData);
    }

  return (
    <>
   <ScheduleFormContainer onSubmit={handleSubmit}>
    <h3>Your Vacations:</h3>
    {vacationDates.map((dateRange, index) => (
    <div key={index}>
    <DatePickerRange
    startDate={dateRange.startDate}
     endDate={dateRange.endDate}
      onChange={(newDateRange) => handleDateChange(newDateRange, index)}
      />
        <button onClick={() => handleRemoveDate(index)}>Remove</button>
        </div>        
        ))}
        <button type="button" onClick={handleAddDate}>Add Vacation Date</button>
        <button type="submit">Submit</button>
    </ScheduleFormContainer>
    </>
  );
}