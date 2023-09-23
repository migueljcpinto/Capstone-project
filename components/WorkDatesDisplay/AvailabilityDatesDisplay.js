import React, { Fragment } from "react";
import {
  Dates,
  DatesItem,
  DatesDisplay,
  DeleteButton,
} from "./WorkDatesDisplay.styled";
import { format } from "date-fns";
import RemoveSVGIcon from "@/utilities/Icons/RemoveNurseSlotIcon";

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
              {format(new Date(availability.date), "dd/MM/yyyy")} <br />
              {availability.shift} shift
              <DeleteButton
                onClick={() => onAvailabilityRemove(availability._id)}
              >
                <RemoveSVGIcon />
              </DeleteButton>
            </DatesItem>
          </Fragment>
        ))}
      </Dates>
    </DatesDisplay>
  );
}
