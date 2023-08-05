import { useRouter } from "next/router";
import Image from "next/image";
import {
  DeleteButtonStyled,
  GoBackLinkStyled,
  StyledNurseProfile,
  UpdateButtonStyled,
} from "./NurseProfile.styled";
import UpdateNurse from "../UpdateNurse/UpdateNurse";

export default function NurseProfile({
  isEdit,
  setIsEdit,
  nurseData,
  onDeleteNurse,
  onSubmit,
}) {
  const router = useRouter();

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
      <DeleteButtonStyled onClick={onDeleteNurse} type="button">
        Delete
      </DeleteButtonStyled>
      {!isEdit && (
        <UpdateButtonStyled
          onClick={() => {
            setIsEdit(!isEdit);
          }}
          type="button"
        >
          {!isEdit && "Update"}
        </UpdateButtonStyled>
      )}
      {isEdit && <UpdateNurse nurseData={nurseData} onSubmit={onSubmit} />}
    </>
  );
}
