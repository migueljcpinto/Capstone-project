import useSWR from "swr";
import { useState } from "react";
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
} from "./FormAddNurse.styled";
import Image from "next/image";

export default function FormAddNurse() {
  const { mutate } = useSWR("/api/nurses"); //check if db has new data - re-validation!
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(getRandomImageURL());

  function getRandomImageURL() {
    const randomNumber = Math.floor(Math.random() * 70) + 1; //Random number for the nurse photo from 1 to 70
    return `https://i.pravatar.cc/150?img=${randomNumber}`;
  }

  async function handleSubmit(event) {
    event.preventDefault(); //preventing new loading

    const formData = new FormData(event.target);
    const nurseData = {
      name: formData.get("name"),
      age: Number(formData.get("age")),
      yearsExperience: Number(formData.get("yearsExperience")),
      role: formData.get("role"),
      hoursPerWeek: Number(formData.get("hoursPerWeek")),
      specialist: formData.get("specialist") === "true", // Convert string to boolean
      image: getRandomImageURL(), //to generate a random image
    }; //reading the nurse data

    //calling API
    const response = await fetch(`/api/nurses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Set the content type to JSON
      body: JSON.stringify(nurseData), //Adding in body the new nurse
    });

    if (response.ok) {
      mutate();
      setSelectedImage(getRandomImageURL());
      router.back(); //later I will write this with push, to navigate back to a specific page, like NurseTeam
    } else {
      const responseData = await response.json();
      console.error("Error adding nurse:", responseData.message);
    }

    event.target.reset();
    event.target.elements[0].focus();
  }
  function handleCancel() {
    router.back(); //The same...need future update
  }

  return (
    <>
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
            max={60}
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

          {/* <Image
            width={76.9}
            height={76.9}
            src={selectedImage}
            alt="Random Nurse Photo"
            style={{ display: "none" }}
          /> */}
          <AddButtonStyled type="submit">New Nurse</AddButtonStyled>
          <CancelButtonStyled type="button" onClick={handleCancel}>
            Cancel
          </CancelButtonStyled>
        </InputGroup>
      </FormContainer>
    </>
  );
}
