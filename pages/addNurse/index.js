import FormAddNurse from "@/components/FormAddNurse/FormAddNurse";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function AddNursePage() {
  const { mutate } = useSWR("/api/nurses"); //check if db has new data - re-validation!
  const router = useRouter();

  async function handleSubmitNurse(nurseData) {
    //calling API
    try {
      const response = await fetch(`/api/nurses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Set the content type to JSON
        body: JSON.stringify(nurseData), //Adding in body the new nurse
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.error("Error adding nurse:", responseData.message);
        return;
      }
      mutate();
      setSelectedImage(getRandomImageURL());
      router.back();
    } catch (error) {
      console.error("Something wrong with adding that!:", error.message);
    }
  }

  return <FormAddNurse onSubmitNurse={handleSubmitNurse} />;
}
