import React, { Fragment } from "react";
import { DatesDisplay, DeleteButton, Dates } from "./WorkDatesDisplay.styled";
import { format } from "date-fns";

export default function WorkDatesDisplay({
  absenceDates,
  availabilityDates,
  onAbsenceRemove,
  onAvailabilityRemove,
}) {
  console.log("Absence Dates:", absenceDates);
  console.log("Availability Dates:", availabilityDates);
  const vacationDates =
    absenceDates?.filter((absence) => absence.type === "vacation") || [];
  const daysOff =
    absenceDates?.filter((absence) => absence.type === "dayOff") || [];
  return (
    <DatesDisplay>
      <h4>Your Vacation Dates:</h4>
      <ul>
        {vacationDates.map((vacation) => (
          <Fragment key={vacation._id}>
            {vacation.date.map((date) => (
              <li key={date}>
                Date: {format(new Date(date), "dd/MM/yyyy")}
                <DeleteButton
                  onClick={() => onAbsenceRemove(vacation._id, date)}
                >
                  Remove
                </DeleteButton>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>

      <h4>Your Days-Off:</h4>
      <ul>
        {daysOff.map((day) => (
          <Fragment key={day._id}>
            {day.date.map((date) => (
              <li key={date}>
                Day Off: {format(new Date(date), "dd/MM/yyyy")}
                <DeleteButton onClick={() => onAbsenceRemove(day._id, date)}>
                  Remove
                </DeleteButton>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>

      <h4>Your Availability:</h4>
      <ul>
        {availabilityDates &&
          availabilityDates.map((availability) => (
            <Fragment key={availability._id}>
              <li key={availability.date}>
                Date: {format(new Date(availability.date), "dd/MM/yyyy")} -
                Shift: {availability.shift}
                <DeleteButton
                  onClick={() => onAvailabilityRemove(availability._id)}
                >
                  Remove
                </DeleteButton>
              </li>
            </Fragment>
          ))}
      </ul>
    </DatesDisplay>
  );
}
