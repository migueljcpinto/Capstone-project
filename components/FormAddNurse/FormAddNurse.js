import { useRouter } from "next/router";
import {
  FormContainer,
  InputGroup,
  Label,
  Input,
  Select,
  CancelButtonStyled,
  AddButtonStyled,
  HeaderStyled,
  ButtonsContainer,
} from "./FormAddNurse.styled";
import getRandomImageURL from "@/utilities/getRandomImageURL";

export default function FormAddNurse({ onSubmitNurse }) {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault(); //preventing new loading

    const formData = new FormData(event.target);
    const nurseData = {
      name: formData.get("name"),
      age: Number(formData.get("age")),
      yearsExperience: Number(formData.get("yearsExperience")),
      role: formData.get("role"),
      hoursPerWeek: Number(formData.get("hoursPerWeek")),
      specialist: formData.get("isSpecialist") === "true", // Convert string to boolean
      image: getRandomImageURL(), //to generate a random image
      email: formData.get("email"),
      phoneNumber: Number(formData.get("phoneNumber")),
      description: formData.get("description"),
    }; //reading the nurse data

    try {
      await onSubmitNurse(nurseData);
    } catch (error) {}

    event.target.reset();
    event.target.elements[0].focus();
  }

  function handleCancelClick() {
    router.back(); //The same...need future update
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <HeaderStyled>Add a new Nurse in your Team</HeaderStyled>
      <InputGroup>
        <Label htmlFor="name">Enter the name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          minLength={5}
          maxLength={20}
          pattern="[A-Za-z\s]+"
          placeholder="Enter the name of the nurse"
          required
        />

        <Label htmlFor="age">Enter the age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          defaultValue="20"
          min={20}
          max={65}
          pattern="\d+"
          required
        />

        <Label htmlFor="yearsExperience">Enter the years of experience</Label>
        <Input
          id="yearsExperience"
          name="yearsExperience"
          type="number"
          required
          min={0}
          max={50}
          pattern="\d+"
          placeholder="Enter years of experience"
        />

        <Label htmlFor="role">Enter their role</Label>
        <Select id="role" name="role">
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

        <Label htmlFor="email">Enter the E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          pattern="[a-zA-Z0-9._%+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          placeholder="Enter the email of the nurse"
          required
        />

        <Label htmlFor="phoneNumber">Enter the phone number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          inputMode="numeric"
          pattern="\d+"
          placeholder="Enter the phone number of the nurse"
          required
        />

        <Label htmlFor="description">Notes</Label>
        <Input as="textarea" name="description" required></Input>

        <ButtonsContainer>
          <AddButtonStyled type="submit">New Nurse</AddButtonStyled>
          <CancelButtonStyled type="button" onClick={handleCancelClick}>
            Cancel
          </CancelButtonStyled>
        </ButtonsContainer>
      </InputGroup>
    </FormContainer>
  );
}
