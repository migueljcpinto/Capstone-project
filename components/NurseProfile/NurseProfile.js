import useSWR from "swr";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import {
  DeleteButtonStyled,
  GoBackLinkStyled,
  StyledNurseProfil,
  UpdateButtonStyled,
} from "./NurseProfile.styled";
import FormAddNurse from "../FormAddNurse/FormAddNurse";
import Link from "next/link";

export default function NurseProfile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/nurses/${id}`);

  function handleEdit() {
    event.preventDefault();

    //Copyed from FormAddNurse - handleSubmit function
    const formData = new FormData(event.target);
    const nurseData = {
      name: formData.get("name"),
      age: Number(formData.get("age")),
      yearsExperience: Number(formData.get("yearsExperience")),
      role: formData.get("role"),
      hoursPerWeek: Number(formData.get("hoursPerWeek")),
      specialist: formData.get("isSpecialist") === "true",
      image: getRandomImageURL(),
    };

    const response = fetch(`/api/nurses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nurseData),
    });

    if (response.ok) {
      mutate();
    }
  }

  async function handleDelete() {
    await fetch(`/api/nurses/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Maybe he resigned without warning! 🤬</div>;
  }

  return (
    <>
      <StyledNurseProfil>
        <Image
          width={76.8}
          height={76.8}
          src={data.image}
          alt={`${data.name} Nurse Photo`}
        />
        <h2>{data.name} </h2>
        <h3>{data.role}</h3>
      </StyledNurseProfil>
      <GoBackLinkStyled href="/">Back to all</GoBackLinkStyled>
      <DeleteButtonStyled href="/" type="button">
        Delete
      </DeleteButtonStyled>
      <UpdateButtonStyled href="/" type="button">
        Update
      </UpdateButtonStyled>
    </>
  );
}
