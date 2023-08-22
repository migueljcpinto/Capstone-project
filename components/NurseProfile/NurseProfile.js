import { useRouter } from "next/router";
import Image from "next/image";
import {
  DeleteButtonStyled,
  GoBackButton,
  StyledNurseProfile,
  UpdateButtonStyled,
  ContactsContainer,
  WorkScheduleLink,
} from "./NurseProfile.styled";
import UpdateNurse from "../UpdateNurse/UpdateNurse";

export default function NurseProfile({
  isEdit,
  setIsEdit,
  nurseData,
  onDeleteNurse,
  onSubmit,
  handleScheduleSubmit,
}) {
  const router = useRouter();

  function handleGoBack() {
    router.push("/");
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
      <ContactsContainer>
        <p>Notes: {nurseData.description}</p>
        <p>Email: {nurseData.email}</p>
        <p>Phone Number: {nurseData.phoneNumber}</p>
      </ContactsContainer>
      <nav>
        <GoBackButton onClick={handleGoBack}>Return</GoBackButton>
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
            Update
          </UpdateButtonStyled>
        )}
        {isEdit && <UpdateNurse nurseData={nurseData} onSubmit={onSubmit} />}
        <WorkScheduleLink
          href={`/nurses/${nurseData._id}/schedule`}
          handleScheduleSubmit={handleScheduleSubmit}
        >
          Work Schedule
        </WorkScheduleLink>
      </nav>
    </>
  );
}
