import FormAddNurse from "@/components/FormAddNurse/FormAddNurse";
import { useRouter } from "next/router";

export default function AddNursePage() {
  const router = useRouter();

  async function handleSubmitNurse(nurseData) {
    try {
      const response = await fetch(`/api/nurses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Set the content type to JSON
        body: JSON.stringify(nurseData),
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.error("Error adding nurse:", responseData.message);
        return;
      }
      alert("Nurse added successfully!");
      router.back();
    } catch (error) {
      console.error("Something wrong with adding that!:", error.message);
    }
  }

  return <FormAddNurse onSubmitNurse={handleSubmitNurse} />;
}
