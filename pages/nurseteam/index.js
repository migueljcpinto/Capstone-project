import LoaderSpinner from "@/components/LoaderSpinner/AmbulanceLoading";
import NurseTeam from "@/components/NurseTeam/NurseTeam";
import useSWR from "swr";

export default function Team() {
  const { data, isLoading } = useSWR("/api/nurses");
  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!data) {
    return (
      <>
        <h1>You have no Team! 😩</h1>
        <p>Please try again later</p>
      </>
    );
  }
  return <NurseTeam />;
}
