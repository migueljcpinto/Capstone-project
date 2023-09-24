import useSWR from "swr";
import { useRouter } from "next/router";
import { useState } from "react";
import NurseProfile from "@/components/NurseProfile/NurseProfile";
import LoaderSpinner from "@/components/LoaderSpinner/AmbulanceLoading";
import Modal from "@/components/Modals/Modal";

export default function NursePage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, mutate } = useSWR(`/api/nurses/${id}`);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      email: formData.get("email"),
      phoneNumber: Number(formData.get("phoneNumber")),
      description: formData.get("description"),
    };
    const response = await fetch(`/api/nurses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNurseData),
    });

    if (response.ok) {
      mutate();
    } else {
      const responseData = await response.json();
      console.error(responseData.error || "Failed to update nurse");
    }
    return response;
  }

  async function handleDelete() {
    setShowDeleteModal(true);
  }
  async function confirmDelete() {
    const response = await fetch(`/api/nurses/${id}`, { method: "DELETE" });
    if (response.ok) {
      router.push("/nurseteam");
    }
    setShowDeleteModal(false);
  }

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!data) {
    return <p>Nurse not found!</p>;
  }

  return (
    <>
      <NurseProfile
        nurseData={data}
        onDeleteNurse={handleDelete}
        onSubmit={handleEditNurse}
      />
      {showDeleteModal && (
        <Modal
          setShowModal={setShowDeleteModal}
          title="Confirmation"
          message={`Are you sure you want to fire ${data?.name}?`}
          buttonText="Confirm"
          buttonAction={confirmDelete}
        />
      )}
    </>
  );
}
