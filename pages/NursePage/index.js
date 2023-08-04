import useSWR from "swr";
import { useRouter } from "next/router";
import NurseProfile from "@/components/NurseProfile/NurseProfile";

export default function NursePage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/nurses/${id}`);

  async function handleDelete() {
    const response = await fetch(`/api/nurses/${id}`, { method: "DELETE" });

    if (!response.ok) {
      return;
    }

    router.push("/");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Maybe he resigned without warning! 🤬</div>;
  }

  return (
    <NurseProfile
      nurseData={data}
      onHandleDelete={handleDelete}
      onMutate={mutate}
    />
  );
}
