import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  DeleteButtonStyled,
  GoBackLinkStyled,
  StyledNurseProfile,
  UpdateButtonStyled,
} from "./NurseProfile.styled";
import UpdateNurse from "../UpdateNurse/UpdateNurse";

export default function NurseProfile({ nurseData, onHandleDelete, onMutate }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    await onHandleDelete();
  }

  function handleGoBack() {
    router.back();
  }

  return (
    <>
      <StyledNurseProfile>
        <Image
          width={76.8}
          height={76.8}
          src={nurseData.image}
          alt={`${nurseData.name} Nurse Photo`}
        />
        <h2>{nurseData.name} </h2>
        <h3>{nurseData.role}</h3>
      </StyledNurseProfile>

      <GoBackLinkStyled onClick={handleGoBack}>Return</GoBackLinkStyled>
      <DeleteButtonStyled onClick={handleDelete} type="button">
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
      {isEditMode && <UpdateNurse nurseData={nurseData} onMutate={onMutate} />}
    </>
  );
}
