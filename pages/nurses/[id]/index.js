import useSWR from "swr";
import { useRouter } from "next/router";
import { useState } from "react";
import NurseProfile from "@/components/NurseProfile/NurseProfile";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";

export default function NursePage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, mutate } = useSWR(`/api/nurses/${id}`);
  const [isEdit, setIsEdit] = useState(false);

  async function handleEditNurse(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedNurseData = {
      name: formData.get("name"),
      age: Number(formData.get("age")),
      yearsExperience: Number(formData.get("yearsExperience")),
      role: formData.get("role"),
      hoursPerWeek: Number(formData.get("hoursPerWeek")),
      specialist: formData.get("isSpecialist") === "true",
    };
    const response = await fetch(`/api/nurses/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNurseData),
    });

    if (response.ok) {
      mutate();
      alert("Updated!");
    }
  }

  async function handleDelete() {
    const shouldDelete = window.confirm(
      `Are you sure you want to fire ${data?.name}?`
    );
    if (shouldDelete) {
      const response = await fetch(`/api/nurses/${id}/`, { method: "DELETE" });
      if (response.ok) {
        router.push("/");
      }
    }
  }

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!data) {
    return <div>Nurse not found!</div>;
  }

  return (
    <NurseProfile
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      nurseData={data}
      onDeleteNurse={handleDelete}
      onSubmit={handleEditNurse}
    />
  );
}
