import Link from "next/link";
import { useState } from "react";
import {
  AuthButton,
  AuthInput,
  AuthSec,
  AuthText,
  EnjoyText,
  ErrorMessage,
} from "./SignUp&Login.styled";

export default function LoginForm({ onFormSubmit, errorMessage }) {
  //Storing Form Values
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    onFormSubmit(formValues);
  }

  return (
    <AuthSec>
      <AuthText>Log in</AuthText>
      <form onSubmit={handleFormSubmit}>
        <AuthInput
          type="email"
          name="email"
          placeholder=" Email"
          value={formValues.email}
          onChange={handleChange}
        />
        <AuthInput
          type="password"
          name="password"
          placeholder=" Password"
          value={formValues.password}
          onChange={handleChange}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <AuthButton type="submit">Log in</AuthButton>
      </form>

      <br />
      <EnjoyText>
        Do you want to create an account? <Link href="/signup">Sign Up</Link>
      </EnjoyText>
    </AuthSec>
  );
}
