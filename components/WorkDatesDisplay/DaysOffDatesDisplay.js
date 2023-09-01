import React, { Fragment } from "react";
import { Dates, DatesDisplay, DeleteButton } from "./WorkDatesDisplay.styled";
import { format } from "date-fns";

export default function DaysOffDatesDisplay({ absencesData, onAbsenceRemove }) {
  const daysOff =
    absencesData?.filter((absence) => absence.type === "dayOff") || [];

  return (
    <DatesDisplay>
      <ul>
        {daysOff.map((day) => (
          <Fragment key={day._id}>
            {day.date.map((date) => (
              <Dates key={date}>
                Day Off: {format(new Date(date), "dd/MM/yyyy")}
                <DeleteButton onClick={() => onAbsenceRemove(day._id, date)}>
                  Remove
                </DeleteButton>
              </Dates>
            ))}
          </Fragment>
        ))}
      </ul>
    </DatesDisplay>
  );
}
