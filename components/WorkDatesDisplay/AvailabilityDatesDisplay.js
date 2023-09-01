import React, { Fragment } from "react";
import {
  Dates,
  DatesItem,
  DatesDisplay,
  DeleteButton,
} from "./WorkDatesDisplay.styled";
import { format } from "date-fns";

export default function AvailabilityDatesDisplay({
  availabilityData,
  onAvailabilityRemove,
}) {
  return (
    <DatesDisplay>
      <Dates>
        {availabilityData?.map((availability) => (
          <Fragment key={availability._id}>
            <DatesItem key={availability.date}>
              {format(new Date(availability.date), "dd/MM/yyyy")} - Shift:{" "}
              {availability.shift}
            </DatesItem>
            <DeleteButton
              onClick={() => onAvailabilityRemove(availability._id)}
            >
              Remove
            </DeleteButton>
          </Fragment>
        ))}
      </Dates>
    </DatesDisplay>
  );
}
