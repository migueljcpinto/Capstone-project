import React, { Fragment } from "react";
import { DatesDisplay, DeleteButton, Dates } from "./WorkDatesDisplay.styled";
import { format } from "date-fns";

export default function WorkDatesDisplay({ absenceDates, onDateRemove }) {
  const vacationDates =
    absenceDates?.filter((absence) => absence.type === "vacation") || [];
  const daysOff =
    absenceDates?.filter((absence) => absence.type === "dayOff") || [];
  console.log(absenceDates);
  return (
    <DatesDisplay>
      <h4>Your Vacation Dates:</h4>
      <ul>
        {vacationDates.map((vacation) => (
          <Fragment key={vacation._id}>
            {vacation.date.map((date, index) => (
              <li key={index}>
                Date: {format(new Date(date), "dd/MM/yyyy")}
                <DeleteButton onClick={() => onDateRemove(vacation._id, date)}>
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
            {day.date.map((date, index) => (
              <li key={index}>
                Day Off: {format(new Date(date), "dd/MM/yyyy")}
                <DeleteButton onClick={() => onDateRemove(day._id, date)}>
                  Remove
                </DeleteButton>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
    </DatesDisplay>
  );
}
