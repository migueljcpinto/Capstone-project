import React, { Fragment } from "react";
import { DatesDisplay, DeleteButton, Dates } from "./WorkDatesDisplay.styled";

export default function WorkDatesDisplay({ workDates, onDateRemove }) {
  return (
    <DatesDisplay>
      <h4>Your Vacation Dates:</h4>
      {workDates && workDates.length > 0 ? (
        <ul>
          {workDates.map((workDate) => (
            <li key={workDate._id}>
              {workDate.vacationDates.map((dateRange, index) => (
                <Fragment key={index}>
                  <Dates>
                    From: {new Date(dateRange.startDate).toLocaleDateString()}
                    To: {new Date(dateRange.endDate).toLocaleDateString()}
                  </Dates>
                  <DeleteButton
                    onClick={() =>
                      onDateRemove(index, workDate._id, null, dateRange)
                    }
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
      {workDates && workDates.length > 0 ? (
        <ul>
          {workDates.map((workDate) => (
            <li key={workDate._id}>
              {workDate.daysOff.map((dayOff, index) => (
                <Fragment key={index}>
                  <Dates>
                    Day Off: {new Date(dayOff).toLocaleDateString()}
                  </Dates>
                  <DeleteButton
                    onClick={() => onDateRemove(index, workDate._id, dayOff)}
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
