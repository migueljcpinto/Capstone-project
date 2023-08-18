import WorkScheduleForm from "@/components/WorkScheduleForm/WorkScheduleForm";
import useSWR from "swr";
import { useRouter } from "next/router";
import fetcher from "@/utilities/fetcher";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";
import { GoBackLinkStyled } from "@/components/NurseProfile/NurseProfile.styled";

export default function SchedulePage() {
  const router = useRouter();
  const { id } = router.query; //Nurse id
  const { data: nurseData, isLoading, mutate } = useSWR(id ? `/api/nurses/${id}` : null);
  const { data: workDatesData } = useSWR(id ? `/api/work-dates/${id}` : null, fetcher);
  
  
 if(isLoading) return <LoaderSpinner/>
  
    async function handleScheduleSubmit(formData) {


    const scheduleData = {
      vacationDates: formData.vacationDates,
 //later add daysOff and availability
    };
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
          vacationDates: nurseData.vacationDates ? [...nurseData.vacationDates, data._id] : [data._id],
        }),
      });

      if (responseNurse.ok) {
        mutate(`/api/work-dates/${id}`);
      }
    }
  }
  return (
  <div>
    <WorkScheduleForm onScheduleSubmit={handleScheduleSubmit} nurseData={nurseData} workDates={workDatesData} />
    <div>
    <h4>Datas de Férias Existentes:</h4>
    {workDatesData && workDatesData.vacationDates && workDatesData.vacationDates.map((dateRange, index) => (
    <div key={index}>
        De: {new Date(dateRange.startDate).toLocaleDateString()} 
        Até: {new Date(dateRange.endDate).toLocaleDateString()}
    </div>
))}
</div>
    <GoBackLinkStyled onClick={() => router.back()}>Return</GoBackLinkStyled>
  </div>
  )
}
