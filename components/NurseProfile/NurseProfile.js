import {
  NurseProfileContainer,
  DeleteButtonStyled,
  NurseProfileHeader,
  ActionButtons,
  UpdateButtonStyled,
  ContactsContainer,
  WorkScheduleLink,
  NurseImage,
  NurseInformation,
  ActionsContainer,
  InfoContainer,
  InfoActionsContainer,
  ReturnContainer,
} from "./NurseProfile.styled";
import UpdateNurse from "../UpdateNurse/UpdateNurse";
import EmailIcon from "@/utilities/Icons/EmailIcon";
import PhoneIcon from "@/utilities/Icons/PhoneIcon";
import BackButton from "../BackButton/BackButton";
import { useState } from "react";

export default function NurseProfile({
  nurseData,
  onDeleteNurse,
  onSubmit,
  handleScheduleSubmit,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleUpdateNurse() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <NurseProfileContainer>
        <ReturnContainer>
          <BackButton />
        </ReturnContainer>
        <NurseProfileHeader>
          <NurseImage
            width={76.8}
            height={76.8}
            src={nurseData.image}
            alt={`${nurseData.name} Nurse Photo`}
          />
          <h2>{nurseData.name} </h2>
          <h3>{nurseData.role}</h3>
        </NurseProfileHeader>
        <InfoActionsContainer>
          <InfoContainer>
            <NurseInformation>
              <h4>Quote:</h4>
              <p> {nurseData.description}</p>

              <ContactsContainer>
                <a href={`mailto:${nurseData.email}`}>
                  <EmailIcon />
                </a>
                <a href={`tel:${nurseData.phoneNumber}`}>
                  <PhoneIcon />
                </a>{" "}
              </ContactsContainer>
            </NurseInformation>
          </InfoContainer>
          <ActionsContainer>
            <hr />
            <ActionButtons>
              <DeleteButtonStyled onClick={onDeleteNurse} type="button">
                Delete
              </DeleteButtonStyled>

              <UpdateButtonStyled onClick={toggleUpdateNurse} type="button">
                Update
              </UpdateButtonStyled>
              {isModalOpen && (
                <UpdateNurse
                  nurseData={nurseData}
                  onSubmit={onSubmit}
                  setIsModalOpen={setIsModalOpen}
                />
              )}
              <WorkScheduleLink
                href={`/nurses/${nurseData._id}/schedule`}
                handleScheduleSubmit={handleScheduleSubmit}
              >
                Work Schedule
              </WorkScheduleLink>
            </ActionButtons>
          </ActionsContainer>
        </InfoActionsContainer>
      </NurseProfileContainer>
    </>
  );
}
