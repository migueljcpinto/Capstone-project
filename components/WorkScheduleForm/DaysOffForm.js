import { ScheduleFormContainer, Button } from "./WorkScheduleForm.styled";
import DayOffPicker from "../DatePicker/DayOffPicker";

export default function DaysOffForm({
  daysOff,
  setDaysOff,
  onDaysOffSubmit,
  nurseId,
  excludeDates,
}) {
  function handleDaysOffSubmit(event) {
    event.preventDefault();
    const formDaysOffData = {
      daysOff: daysOff,
    };
    onDaysOffSubmit(formDaysOffData);
    setDaysOff([]);
  }

  return (
    <ScheduleFormContainer>
      <DayOffPicker
        daysOff={daysOff}
        excludeDates={excludeDates}
        onDateChange={(newDates) => {
          setDaysOff(newDates);
        }}
      />
      <Button onClick={handleDaysOffSubmit}>Request Days Off</Button>
    </ScheduleFormContainer>
  );
}
