import React, { Fragment } from "react";
import { DatesDisplay, DeleteButton, Dates } from "./WorkDatesDisplay.styled";

export default function WorkDatesDisplay({ workDates, onDateRemove }) {
  return (
    <DatesDisplay>
      <h4>Your Vacation Dates:</h4>
      {workDates && workDates.length > 0 ? (
        workDates.map((workDate) => (
          <div key={workDate._id}>
            {workDate.vacationDates.map((dateRange, index) => (
              <React.Fragment key={index}>
                <Dates>
                  From: {new Date(dateRange.startDate).toLocaleDateString()}
                  To: {new Date(dateRange.endDate).toLocaleDateString()}
                </Dates>
                <DeleteButton onClick={() => onDateRemove(index, workDate._id)}>
                  Remove
                </DeleteButton>
              </React.Fragment>
            ))}
          </div>
        ))
      ) : (
        <p>No Vacations yet!</p>
      )}
    </DatesDisplay>
  );
}
