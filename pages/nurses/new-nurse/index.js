import FormAddNurse from "@/components/FormAddNurse/FormAddNurse";
import { useRouter } from "next/router";

export default function NewNursePage() {
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
        return;
      }
      router.back();
    } catch (error) {}
  }

  return <FormAddNurse onSubmitNurse={handleSubmitNurse} />;
}
