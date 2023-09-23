import React, { Fragment } from "react";
import {
  Dates,
  DatesItem,
  DatesDisplay,
  DeleteButton,
} from "./WorkDatesDisplay.styled";
import { format } from "date-fns";
import RemoveSVGIcon from "@/utilities/Icons/RemoveNurseSlotIcon";

export default function VacationDatesDisplay({
  absencesData,
  onAbsenceRemove,
}) {
  const vacationDates =
    absencesData?.filter((absence) => absence.type === "vacation") || [];

  return (
    <DatesDisplay>
      <Dates>
        {vacationDates.map((vacation) => (
          <Fragment key={vacation._id}>
            {vacation.date.map((date) => (
              <DatesItem key={date}>
                {format(new Date(date), "dd/MM/yyyy")}
                <DeleteButton
                  onClick={() => onAbsenceRemove(vacation._id, date)}
                >
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
