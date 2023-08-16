import WorkScheduleForm from "@/components/WorkScheduleForm/WorkScheduleForm";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function SchedulePage() {
  const router = useRouter();
  const { id } = router.query; //Nurse id
  const { data: nurseData, mutate } = useSWR(`/api/nurses/${id}`);

  async function handleScheduleSubmit(formData) {
    const scheduleData = Object.fromEntries(formData);

    const responseVacation = await fetch("/api/work-dates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
          workSchedule: data._id,
        }),
      });

      if (responseNurse.ok) {
        mutate();
      }
    }
  }
  return <WorkScheduleForm onScheduleSubmit={handleScheduleSubmit} nurseData={nurseData} />;
}
