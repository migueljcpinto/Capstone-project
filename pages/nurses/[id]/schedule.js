import WorkScheduleForm from "@/components/WorkScheduleForm/WorkScheduleForm";
import useSWR from "swr";
import { useRouter } from "next/router";
import fetcher from "@/utilities/fetcher";
import { ReturnLinkStyled } from "@/components/WorkScheduleForm/WorkScheduleForm.styled";
import WorkDatesDisplay from "@/components/WorkDatesDisplay/WorkDatesDisplay";
import { WorkDatesContainer } from "@/components/WorkDatesDisplay/WorkDatesDisplay.styled";

export default function SchedulePage() {
  const router = useRouter();
  const { id } = router.query; //Nurse id
  const { data: nurseData, mutate } = useSWR(id ? `/api/nurses/${id}` : null);
  const { data: workDatesData } = useSWR(
    id ? `/api/work-dates/${id}` : null,
    fetcher
  );

  async function handleRemoveDate(index, workDateId) {
    const response = await fetch(`/api/work-dates/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workDateId }),
    });

    if (response.ok) {
      alert("Date deleted!");
      mutate(`/api/work-dates/${id}`);
    }
  }

  async function handleScheduleSubmit(formData) {
    const scheduleData = {
      vacationDates: formData.vacationDates,
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
          vacationDates: nurseData.vacationDates
            ? [...nurseData.vacationDates, data._id]
            : [data._id],
        }),
      });

      if (responseNurse.ok) {
        alert("Dates added!");
        mutate(`/api/work-dates/${id}`);
      }
    }
  }

  return (
    <>
      <WorkDatesContainer>
        <WorkScheduleForm
          onScheduleSubmit={handleScheduleSubmit}
          nurseData={nurseData}
          workDates={workDatesData}
        />
        <WorkDatesDisplay
          workDates={workDatesData}
          onDateRemove={handleRemoveDate}
        />
      </WorkDatesContainer>
      <ReturnLinkStyled onClick={() => router.back()}>Return</ReturnLinkStyled>
    </>
  );
}
