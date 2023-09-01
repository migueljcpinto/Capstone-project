import React, { Fragment } from "react";
import { Dates, DatesDisplay, DeleteButton } from "./WorkDatesDisplay.styled";
import { format } from "date-fns";

export default function AvailabilityDatesDisplay({
  availabilityData,
  onAvailabilityRemove,
}) {
  return (
    <DatesDisplay>
      <ul>
        {availabilityData?.map((availability) => (
          <Fragment key={availability._id}>
            <Dates key={availability.date}>
              Date: {format(new Date(availability.date), "dd/MM/yyyy")} - Shift:{" "}
              {availability.shift}
              <DeleteButton
                onClick={() => onAvailabilityRemove(availability._id)}
              >
                Remove
              </DeleteButton>
            </Dates>
          </Fragment>
        ))}
      </ul>
    </DatesDisplay>
  );
}
