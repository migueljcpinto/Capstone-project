import { useRouter } from "next/router";
import Image from "next/image";
import {
  DeleteButtonStyled,
  GoBackLinkStyled,
  StyledNurseProfile,
  UpdateButtonStyled,
  ContactsContainer,
  WorkScheduleButton,
} from "./NurseProfile.styled";
import UpdateNurse from "../UpdateNurse/UpdateNurse";
import WorkScheduleForm from "../WorkScheduleForm/WorkScheduleForm";

export default function NurseProfile({
  isEdit,
  setIsEdit,
  isWorkSchedule,
  setIsWorkSchedule,
  nurseData,
  onDeleteNurse,
  onSubmit,
  handleScheduleSubmit
}) {

  const router = useRouter();

  function handleGoBack() {
    router.push("/");
  }
  console.log(handleScheduleSubmit)

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
      <ContactsContainer>
        <p>Notes: {nurseData.description}</p>
        <p>Email: {nurseData.email}</p>
        <p>Phone Number: {nurseData.phoneNumber}</p>
      </ContactsContainer>
      <nav>
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
        {!isWorkSchedule && (
          <WorkScheduleButton
            onClick={() => {
              setIsWorkSchedule(!isWorkSchedule);
            }}
            type="button"
          >
            {!isWorkSchedule && "Work Schedule"}
          </WorkScheduleButton>
        )}
        {isWorkSchedule && (
          <WorkScheduleForm onScheduleSubmit={handleScheduleSubmit} nurseData={nurseData} />
        )}
      </nav>
    </>
  );
}
