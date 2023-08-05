import { StyledDiv } from "./UpdateNurse.styled";
import {
  FormContainer,
  InputGroup,
  Label,
  Input,
  Select,
  AddButtonStyled,
  HeaderStyled,
} from "@/components/FormAddNurse/FormAddNurse.styled";

export default function UpdateNurse({ nurseData, onSubmit }) {
  return (
    <StyledDiv>
      <FormContainer onSubmit={onSubmit}>
        <HeaderStyled>Update the information about this Nurse</HeaderStyled>
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

          <Label htmlFor="yearsExperience">Enter the years of experience</Label>
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
          <AddButtonStyled type="submit">Update</AddButtonStyled>
        </InputGroup>
      </FormContainer>
    </StyledDiv>
  );
}
