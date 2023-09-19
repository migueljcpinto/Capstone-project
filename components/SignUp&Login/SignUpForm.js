import Link from "next/link";
import {
  EnjoyText,
  AuthButton,
  AuthInput,
  AuthSec,
  AuthText,
  ErrorMessage,
  Inputs,
} from "./SignUp&Login.styled";
import Success from "./Success";
import { useState } from "react";
import EyeOpenIcon from "@/utilities/Icons/EyeOpenIcon";
import EyeClosedIcon from "@/utilities/Icons/EyeClosedIcon";

export default function SignUpForm({
  handleSubmit,
  handleChange,
  formData,
  errors,
  showModal,
  setShowModal,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthSec>
      <form onSubmit={handleSubmit}>
        <AuthText>Create An Account</AuthText>
        <EnjoyText>
          Create an account to enjoy managing your dream team!
        </EnjoyText>

        <label htmlFor="name"></label>
        <AuthInput
          type="text"
          id="name"
          placeholder=" Name"
          value={formData.name}
          onChange={handleChange}
          $hasError={!!errors.name}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        <label htmlFor="email"></label>
        <AuthInput
          id="email"
          type="text"
          placeholder=" Email"
          value={formData.email}
          onChange={handleChange}
          $hasError={!!errors.email}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <Inputs>
          <label htmlFor="password"></label>
          <AuthInput
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder=" Password"
            value={formData.password}
            onChange={handleChange}
            $hasError={!!errors.password}
          />
          <span onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </span>

          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

          <label htmlFor="confirmPassword"></label>
          <AuthInput
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder=" Confirm the password"
            value={formData.confirmPassword}
            onChange={handleChange}
            $hasError={!!errors.confirmPassword}
          />
          <span onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </span>

          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
        </Inputs>
        <AuthButton type="submit">Create Account</AuthButton>
        <EnjoyText>
          Already Have An Account? <Link href={"/login"}>Log In</Link>
        </EnjoyText>
        {showModal && <Success setShowModal={setShowModal} />}
      </form>
    </AuthSec>
  );
}
