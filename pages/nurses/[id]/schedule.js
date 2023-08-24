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
  const { data: nurseData, mutate } = useSWR(id ? `/api/nurses/${id}` : null);
  const { data: workDatesData } = useSWR(id ? `/api/work-dates/${id}` : null);
  const [notification, setNotification] = useState(null);
  const [daysOff, setDaysOff] = useState([]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  async function handleRemoveDate(index, workDateId, dayOffToRemove) {
    const response = await fetch(`/api/work-dates/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workDateId, dayOffToRemove }),
    });

    if (response.ok) {
      setNotification({ message: "Date deleted!", type: "remove" });
      mutate(`/api/work-dates/${id}`);
    }
  }

  async function handleScheduleSubmit(formData) {
    console.log("Data received in handleScheduleSubmit:", formData);

    const scheduleData = {
      vacationDates: formData.vacationDates,
      daysOff: formData.daysOff,
      //later add daysOff and availability
    };
    const responseSchedule = await fetch("/api/work-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nurseId: id,
        ...scheduleData,
      }),
    });

    if (responseSchedule.ok) {
      const data = await responseSchedule.json();
      const responseNurse = await fetch(`/api/nurses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...scheduleData,
          vacationDates: Array.isArray(nurseData.vacationDates)
            ? [...nurseData.vacationDates, data._id]
            : [data._id],
        }),
      });

      if (responseNurse.ok) {
        setNotification({ message: "Dates added!", type: "add" });
        mutate(`/api/work-dates/${id}`);
      }
    }
  }

  return (
    <>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <WorkDatesContainer>
        <WorkScheduleForm
          onScheduleSubmit={handleScheduleSubmit}
          nurseData={nurseData}
          workDates={workDatesData}
          daysOff={daysOff}
          setDaysOff={setDaysOff}
        />
        <WorkDatesDisplay
          workDates={workDatesData}
          onDateRemove={handleRemoveDate}
        />
      </WorkDatesContainer>
      <ReturnButton onClick={() => router.back()}>Return</ReturnButton>
    </>
  );
}
