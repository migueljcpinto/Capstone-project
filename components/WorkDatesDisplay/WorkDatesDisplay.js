export default function WorkDatesDisplay({
  workDates,
  onDateEdit,
  onDateRemove,
}) {
  return (
    <div>
      <h4>Your Vacation Dates:</h4>
      {workDates && workDates.length > 0 ? (
        workDates.map((workDate, idx) => (
          <div key={idx}>
            {workDate.vacationDates.map((dateRange, index) => (
              <div key={index}>
                From: {new Date(dateRange.startDate).toLocaleDateString()}
                To: {new Date(dateRange.endDate).toLocaleDateString()}
                <button
                  onClick={() => {
                    console.log("Edit button clicked for index:", index);
                    onDateEdit(index, dateRange);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    console.log("Remove button clicked for index:", index);
                    onDateRemove(index, workDate._id);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No Vacations yet!</p>
      )}
    </div>
  );
}
