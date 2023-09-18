import Link from "next/link";
import { useState } from "react";
import EyeClosedIcon from "@/utilities/Icons/EyeClosedIcon";
import EyeOpenIcon from "@/utilities/Icons/EyeOpenIcon";
import {
  AuthButton,
  AuthInput,
  AuthSec,
  AuthText,
  EnjoyText,
  ErrorMessage,
  Inputs,
} from "./SignUp&Login.styled";

export default function LoginForm({ onFormSubmit, errorMessage }) {
  //Storing Form Values
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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
        <Inputs>
          <label htmlFor="email" />
          <AuthInput
            id="email"
            type="email"
            name="email"
            placeholder=" Email"
            value={formValues.email}
            onChange={handleChange}
          />
          <label htmlFor="password" />
          <AuthInput
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder=" Password"
            value={formValues.password}
            onChange={handleChange}
          />
          <span onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </span>
        </Inputs>
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
