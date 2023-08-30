import WorkScheduleForm from "@/components/WorkScheduleForm/WorkScheduleForm";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ReturnButton } from "@/components/WorkScheduleForm/WorkScheduleForm.styled";
import WorkDatesDisplay from "@/components/WorkDatesDisplay/WorkDatesDisplay";
import { WorkDatesContainer } from "@/components/WorkDatesDisplay/WorkDatesDisplay.styled";
import Notification from "@/components/Notifications/Notification";

export default function SchedulePage() {
  const router = useRouter();
  const { id } = router.query; //Nurse id
  const { data: nurseData, mutate: mutateNurseData } = useSWR(
    id ? `/api/nurses/${id}` : null
  ); //This mutate function is not currently used, but it could be in the future so I leave it here.
  const { data: absencesData, mutate: mutateAbsencesData } = useSWR(
    id ? `/api/absences/${id}` : null
  );
  const [notification, setNotification] = useState(null);
  const [daysOff, setDaysOff] = useState([]);
  const allAbsenceDates = absencesData
    ? absencesData.flatMap((absence) => absence.date)
    : [];

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  async function handleRemoveDate(absenceId) {
    const response = await fetch(`/api/absences/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ absenceId }),
    });

    if (response.ok) {
      setNotification({ message: "Date deleted!", type: "remove" });
      mutateAbsencesData();
    }
  }

  async function handleVacationSubmit(formData) {
    const { vacationDates } = formData;
    const response = await fetch("/api/absences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nurseId: id,
        type: "vacation",
        date: vacationDates,
      }),
    });

    if (response.ok) {
      setNotification({ message: "Vacation Dates added!", type: "add" });
      mutateAbsencesData();
    }
  }

  async function handleDaysOffSubmit(formData) {
    const { daysOff } = formData;
    const response = await fetch("/api/absences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nurseId: id,
        type: "dayOff",
        date: daysOff,
      }),
    });

    if (response.ok) {
      setNotification({ message: "Days Off added!", type: "add" });
      mutateAbsencesData();
    }
  }

  return (
    <>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <WorkDatesContainer>
        <WorkScheduleForm
          onVacationSubmit={handleVacationSubmit}
          onDaysOffSubmit={handleDaysOffSubmit}
          nurseData={nurseData}
          nurseId={id}
          absenceDates={allAbsenceDates}
          daysOff={daysOff}
          setDaysOff={setDaysOff}
          excludeDates={
            absencesData ? absencesData.map((dateStr) => new Date(dateStr)) : []
          }
        />
        <WorkDatesDisplay
          absenceDates={absencesData}
          onDateRemove={handleRemoveDate}
        />
      </WorkDatesContainer>
      <ReturnButton onClick={() => router.back()}>Return</ReturnButton>
    </>
  );
}
