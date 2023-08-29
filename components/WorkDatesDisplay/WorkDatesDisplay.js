import React, { Fragment } from "react";
import { DatesDisplay, DeleteButton, Dates } from "./WorkDatesDisplay.styled";
import { format } from "date-fns";

export default function WorkDatesDisplay({ absenceDates, onDateRemove }) {
  const vacationDates =
    absenceDates?.filter((absence) => absence.type === "vacation") || [];
  const daysOff =
    absenceDates?.filter((absence) => absence.type === "dayOff") || [];

  return (
    <DatesDisplay>
      <h4>Your Vacation Dates:</h4>
      {vacationDates.length > 0 ? (
        <ul>
          {vacationDates.map((vacation) => (
            <li key={vacation._id}>
              {vacation.date.map((date, index) => (
                <Fragment key={index}>
                  <Dates>Date: {format(new Date(date), "dd/MM/yyyy")}</Dates>
                  <DeleteButton
                    onClick={() => onDateRemove(index, vacation._id, date)}
                  >
                    Remove
                  </DeleteButton>
                </Fragment>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <p>No Vacations yet!</p>
      )}

      <h4>Your Days-Off:</h4>
      {daysOff.length > 0 ? (
        <ul>
          {daysOff.map((day) => (
            <li key={day._id}>
              {day.date.map((date, index) => (
                <Fragment key={index}>
                  <Dates>Day Off: {format(new Date(date), "dd/MM/yyyy")}</Dates>
                  <DeleteButton
                    onClick={() => onDateRemove(index, day._id, date)}
                  >
                    Remove
                  </DeleteButton>
                </Fragment>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <p>No Days Off yet!</p>
      )}
    </DatesDisplay>
  );
}
