import { DatesDisplay, DeleteBotton, Dates } from "./WorkDatesDisplay.styled";

export default function WorkDatesDisplay({ workDates, onDateRemove }) {
  return (
    <DatesDisplay>
      <h4>Your Vacation Dates:</h4>
      {workDates && workDates.length > 0 ? (
        workDates.map((workDate, idx) => (
          <div key={idx}>
            {workDate.vacationDates.map((dateRange, index) => (
              <>
                <Dates key={index}>
                  From: {new Date(dateRange.startDate).toLocaleDateString()}
                  To: {new Date(dateRange.endDate).toLocaleDateString()}
                </Dates>
                <DeleteBotton onClick={() => onDateRemove(index, workDate._id)}>
                  Remove
                </DeleteBotton>
              </>
            ))}
          </div>
        ))
      ) : (
        <p>No Vacations yet!</p>
      )}
    </DatesDisplay>
  );
}
