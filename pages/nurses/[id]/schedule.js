import WorkScheduleForm from "@/components/WorkScheduleForm/WorkScheduleForm";
import useSWR from "swr";
import { useRouter } from "next/router";
import fetcher from "@/utilities/fetcher";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";
import { GoBackLinkStyled } from "@/components/NurseProfile/NurseProfile.styled";

export default function SchedulePage() {
  const router = useRouter();
  const { id } = router.query; //Nurse id
  const { data: nurseData, isLoading, mutate } = useSWR(`/api/nurses/${id}`);
  const { data: workDatesData } = useSWR(`/api/work-dates/${id}`, fetcher);
 
 if(isLoading) return <LoaderSpinner/>
  
  if(!nurseData) return <div>Failed to load nurse data</div>;

    if(!workDatesData) return <div>Failed to load work dates data</div>;

  async function handleScheduleSubmit(formData) {
    const scheduleData = Object.fromEntries(formData);

    const responseSchedule = await fetch("/api/work-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
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
          vacationDates: [...nurseData.nurseWorkDates, data._id],
        }),
      });

      if (responseNurse.ok) {
        mutate();
      }
    }
  }
  return (
  <div>
    <WorkScheduleForm onScheduleSubmit={handleScheduleSubmit} nurseData={nurseData} workDates={workDatesData} />;
    <GoBackLinkStyled onClick={() => router.back()}>Return</GoBackLinkStyled>
  </div>
  )
}
