import SignUpForm from "@/components/SignUp&Login/SignUpForm";
import { FormContainer } from "@/components/SignUp&Login/SignUp&Login.styled";
import LoaderSpinner from "@/components/LoaderSpinner/AmbulanceLoading";

export default function Signup() {
  return (
    <FormContainer>
      <SignUpForm />
    </FormContainer>
  );
}
