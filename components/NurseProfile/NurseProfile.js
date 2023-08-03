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
import UpdateNurse from "../UpdateNurse/UpdateNurse";

export default function NurseProfile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/nurses/${id}`);

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
  mutate();
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
      <DeleteButtonStyled onClick={handleDelete} href="/" type="button">
        Delete
      </DeleteButtonStyled>
      <UpdateButtonStyled
        onClick={() => {
          setIsEditMode(!isEditMode);
        }}
        type="button"
      >
        {isEditMode ? "Cancel" : "Update"}
      </UpdateButtonStyled>
      {isEditMode && <UpdateNurse nurseData={data} />}
    </>
  );
}
