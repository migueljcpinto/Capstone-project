import React, { Fragment } from "react";
import {
  Dates,
  DatesItem,
  DatesDisplay,
  DeleteButton,
} from "./WorkDatesDisplay.styled";
import { format } from "date-fns";
import RemoveSVGIcon from "@/utilities/Icons/RemoveNurseSlotIcon";

export default function DaysOffDatesDisplay({ absencesData, onAbsenceRemove }) {
  const daysOff =
    absencesData?.filter((absence) => absence.type === "dayOff") || [];

  return (
    <DatesDisplay>
      <Dates>
        {daysOff.map((day) => (
          <Fragment key={day._id}>
            {day.date.map((date) => (
              <DatesItem key={date}>
                {format(new Date(date), "dd/MM/yyyy")}
                <DeleteButton onClick={() => onAbsenceRemove(day._id, date)}>
                  <RemoveSVGIcon />
                </DeleteButton>
              </DatesItem>
            ))}
          </Fragment>
        ))}
      </Dates>
    </DatesDisplay>
  );
}
