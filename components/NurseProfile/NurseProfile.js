import { useRouter } from "next/router";
import {
  NurseProfileContainer,
  DeleteButtonStyled,
  GoBackButton,
  NurseProfileHeader,
  ActionButtons,
  UpdateButtonStyled,
  ContactsContainer,
  WorkScheduleLink,
  NurseImage,
  Button,
} from "./NurseProfile.styled";
import UpdateNurse from "../UpdateNurse/UpdateNurse";
import EmailIcon from "@/utilities/Icons/EmailIcon";
import PhoneIcon from "@/utilities/Icons/PhoneIcon";

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
      <NurseProfileContainer>
        <NurseProfileHeader>
          <NurseImage
            width={76.8}
            height={76.8}
            src={nurseData.image}
            alt={`${nurseData.name} Nurse Photo`}
          />
          <h2>{nurseData.name} </h2>
          <h3>{nurseData.role}</h3>
          <br />
          <h4>Quote:</h4>
          <p> {nurseData.description}</p>
        </NurseProfileHeader>
        <ContactsContainer>
          <a href={`mailto:${nurseData.email}`}>
            <EmailIcon />
          </a>
          <a href={`tel:${nurseData.phoneNumber}`}>
            <PhoneIcon />
          </a>{" "}
        </ContactsContainer>
        <hr />
        <ActionButtons>
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
        </ActionButtons>
      </NurseProfileContainer>
    </>
  );
}
