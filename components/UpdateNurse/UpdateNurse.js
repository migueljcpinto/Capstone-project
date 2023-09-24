import {
  StyledDiv,
  XButton,
  UpdateFormContainer,
  UpdateModalOverlay,
} from "./UpdateNurse.styled";
import {
  InputGroup,
  Label,
  Input,
  Select,
  AddButtonStyled,
  HeaderStyled,
} from "@/components/FormAddNurse/FormAddNurse.styled";
import GreenCheckIcon from "@/utilities/Icons/GreenCheckIcon";
import Modal from "../Modals/Modal";
import { useState } from "react";
import WarningIcon from "@/utilities/Icons/WarningIcon";

export default function UpdateNurse({ nurseData, onSubmit, setIsModalOpen }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await onSubmit(event);
      if (response.ok) {
        setShowSuccessModal(true);
        setIsModalOpen(false);
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  return (
    <UpdateModalOverlay>
      <StyledDiv>
        <XButton onClick={() => setIsModalOpen(false)}>X</XButton>
        <UpdateFormContainer onSubmit={handleSubmit}>
          <HeaderStyled>Update the information</HeaderStyled>
          <InputGroup>
            <Label htmlFor="name">Enter the name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              minLength={5}
              maxLength={20}
              pattern="[A-Za-z\s]+"
              defaultValue={nurseData.name}
              required
            />

            <Label htmlFor="age">Enter the age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              min={20}
              max={65}
              pattern="\d+"
              defaultValue={nurseData.age}
              required
            />

            <Label htmlFor="yearsExperience">
              Enter the years of experience
            </Label>
            <Input
              id="yearsExperience"
              name="yearsExperience"
              type="number"
              required
              min={0}
              max={60}
              pattern="\d+"
              defaultValue={nurseData.yearsExperience}
            />

            <Label htmlFor="role">Enter their role</Label>
            <Select id="role" name="role" required>
              <option value="">Choose the role</option>
              <option value="nurse">Nurse</option>
              <option value="chief">Chief</option>
              <option value="sub-chief">Sub-chief</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </Select>

            <Label htmlFor="specialist">Is the nurse a specialist?</Label>
            <Select id="specialist" name="specialist">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </Select>

            <Label htmlFor="email">Enter the email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              pattern="[a-zA-Z0-9._%+]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
              defaultValue={nurseData.email}
              required
            />

            <Label htmlFor="phoneNumber">Enter the phone number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              inputMode="numeric"
              defaultValue={nurseData.phoneNumber}
              pattern="\d+"
              required
            />

            <Label htmlFor="description">Notes</Label>
            <Input
              as="textarea"
              name="description"
              defaultValue={nurseData.description}
            ></Input>

            <AddButtonStyled type="submit">Update</AddButtonStyled>
          </InputGroup>
          {showSuccessModal && (
            <Modal
              setShowModal={setShowSuccessModal}
              title="Success!"
              IconComponent={GreenCheckIcon}
              message="Nurse updated successfully!"
              buttonText="Ok"
              buttonAction={() => {
                setShowSuccessModal(false);
              }}
            />
          )}
          {showErrorModal && (
            <Modal
              setShowModal={setShowErrorModal}
              title="Error!"
              IconComponent={WarningIcon}
              message="There was an error updating the nurse. Please try again."
              buttonText="Try Again"
              type="error"
              buttonAction={() => {
                setShowErrorModal(false);
              }}
            />
          )}
        </UpdateFormContainer>
      </StyledDiv>
    </UpdateModalOverlay>
  );
}
