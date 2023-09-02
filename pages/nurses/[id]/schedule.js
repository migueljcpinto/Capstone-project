import useSWR from "swr";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ReturnButton } from "@/components/WorkScheduleForm/WorkScheduleForm.styled";
import Notification from "@/components/Notifications/Notification";
import ScheduleTabs from "@/components/ScheduleTabs/ScheduleTabs";

export default function SchedulePage() {
  const router = useRouter();
  const nurseId = router.query.id; //Nurse id
  const { data: nurseData } = useSWR(nurseId ? `/api/nurses/${nurseId}` : null);
  const { data: absencesData, mutate: mutateAbsencesData } = useSWR(
    nurseId ? `/api/absences/${nurseId}` : null
  );
  const { data: availabilityData, mutate: mutateAvailabilityData } = useSWR(
    nurseId ? `/api/availability/${nurseId}` : null
  );

  const [notification, setNotification] = useState(null);
  const [daysOff, setDaysOff] = useState([]);

  const { data: absencesFromDB, error: absenceError } = useSWR(
    nurseId ? `/api/absences/${nurseId}` : null
  );
  const { data: availabilityDataFromSWR, error: availabilityError } = useSWR(
    nurseId ? `/api/availability/${nurseId}` : null
  );

  if (absenceError)
    console.error("Error searching the blocked dates:", absenceError);
  if (availabilityError)
    console.error("Error fetching availability:", availabilityError);

  const allAbsenceDates = absencesFromDB
    ? absencesFromDB.flatMap((absence) => absence.date)
    : [];
  const allAvailabilityDates = availabilityDataFromSWR
    ? availabilityDataFromSWR.map((availability) => availability.date)
    : [];

  const excludeDatesList = [
    ...daysOff,
    ...allAbsenceDates,
    ...allAvailabilityDates,
  ].map((dateStr) => new Date(dateStr));

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);
  async function handleRemoveAbsence(absenceId) {
    const response = await fetch(`/api/absences/${nurseId}`, {
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
    const response = await fetch(`/api/availability/${nurseId}`, {
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
        nurseId: nurseId,
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
        nurseId: nurseId,
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
    const response = await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nurseId: nurseId,
        type: "availability",
        date: availability.date,
        shift: availability.shift,
      }),
    });

    if (response.ok) {
      setNotification({ message: "Availability added!", type: "add" });
      mutateAvailabilityData();
    }
    return response;
  }

  return (
    <>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <ScheduleTabs
        onVacationSubmit={handleVacationSubmit}
        onDaysOffSubmit={handleDaysOffSubmit}
        onAvailabilitySubmit={handleAvailabilitySubmit}
        nurseData={nurseData}
        nurseId={nurseId}
        absenceDates={allAbsenceDates}
        availabilityDates={allAvailabilityDates}
        daysOff={daysOff}
        setDaysOff={setDaysOff}
        excludeDates={excludeDatesList}
        absencesData={absencesData}
        availabilityData={availabilityData}
        onAbsenceRemove={handleRemoveAbsence}
        onAvailabilityRemove={handleRemoveAvailability}
      />

      <ReturnButton onClick={() => router.back()}>Return</ReturnButton>
    </>
  );
}
