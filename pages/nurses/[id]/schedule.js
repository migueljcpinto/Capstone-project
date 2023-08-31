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
  const { data: nurseData } = useSWR(id ? `/api/nurses/${id}` : null);
  const { data: absencesData, mutate: mutateAbsencesData } = useSWR(
    id ? `/api/absences/${id}` : null
  );
  const { data: availabilityData, mutate: mutateAvailabilityData } = useSWR(
    id ? `/api/availability/${id}` : null
  );
  const [notification, setNotification] = useState(null);
  const [daysOff, setDaysOff] = useState([]);

  const allAbsenceDates = absencesData
    ? absencesData.flatMap((absence) => absence.date)
    : [];

  const allAvailabilityDates = availabilityData
    ? availabilityData.flatMap((availability) => availability.date)
    : [];

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  async function handleRemoveAbsence(absenceId) {
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

  async function handleRemoveAvailability(availabilityId) {
    const response = await fetch(`/api/availability/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ availabilityId }),
    });

    if (response.ok) {
      setNotification({ message: "Availability deleted!", type: "remove" });
      mutateAvailabilityData();
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
    } else {
      const errorData = await response.json();
      setNotification({
        message: errorData.error || "An error occurred!",
        type: "error",
      });
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

  async function handleAvailabilitySubmit(formData) {
    const { availability } = formData;
    console.log("Handling availability with data:", formData);
    const response = await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nurseId: id,
        type: "availability",
        date: availability.date,
        shift: availability.shift,
      }),
    });

    if (response.ok) {
      setNotification({ message: "Availability added!", type: "add" });
      mutateAvailabilityData();
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
          onAvailabilitySubmit={handleAvailabilitySubmit}
          nurseData={nurseData}
          nurseId={id}
          absenceDates={allAbsenceDates}
          availabilityDates={allAvailabilityDates}
          daysOff={daysOff}
          setDaysOff={setDaysOff}
          excludeDates={[
            ...(absencesData
              ? absencesData.map((dateStr) => new Date(dateStr))
              : []),
            ...allAvailabilityDates,
          ]}
        />
        <WorkDatesDisplay
          absenceDates={absencesData}
          availabilityDates={availabilityData}
          onAbsenceRemove={handleRemoveAbsence}
          onAvailabilityRemove={handleRemoveAvailability}
        />
      </WorkDatesContainer>
      <ReturnButton onClick={() => router.back()}>Return</ReturnButton>
    </>
  );
}
