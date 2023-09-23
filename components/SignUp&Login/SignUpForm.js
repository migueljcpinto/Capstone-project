import Link from "next/link";
import {
  EnjoyText,
  AuthButton,
  AuthInput,
  AuthSec,
  AuthText,
  ErrorMessage,
  Inputs,
  Title,
} from "./SignUp&Login.styled";
import Modal from "../Modals/Modal";
import { useState } from "react";
import EyeOpenIcon from "@/utilities/Icons/EyeOpenIcon";
import EyeClosedIcon from "@/utilities/Icons/EyeClosedIcon";
import { useRouter } from "next/router";
import GreenCheckIcon from "@/utilities/Icons/GreenCheckIcon";
import WarningIcon from "@/utilities/Icons/WarningIcon";
import ButtonSpinner from "../LoaderSpinner/ButtonSpinner";

export default function SignUpForm({
  handleSubmit,
  handleChange,
  formData,
  errors,
  showSuccessModal,
  setShowSuccessModal,
  showErrorModal,
  setShowErrorModal,
  isLoading,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  return (
    <AuthSec>
      <Title>Team´Up</Title>
      <form onSubmit={handleSubmit}>
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
          autoFocus
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
        <AuthButton type="submit">
          {isLoading ? <ButtonSpinner /> : "Create Account"}
        </AuthButton>
        <EnjoyText>
          Already Have An Account? <Link href={"/login"}>Log In</Link>
        </EnjoyText>
        {showSuccessModal && (
          <Modal
            setShowModal={setShowSuccessModal}
            title="Welcome Aboard!"
            IconComponent={GreenCheckIcon}
            message="Your account has been successfully created!"
            buttonText="Let's Go!"
            buttonAction={() => {
              setShowSuccessModal(false);
              router.push("/login");
            }}
          />
        )}
        {showErrorModal && (
          <Modal
            setShowModal={setShowErrorModal}
            title="Error!"
            IconComponent={WarningIcon}
            message="There was an error with signing up."
            buttonText="Try Again"
            type="error"
            buttonAction={() => {
              setShowErrorModal(false);
              router.push("/signup");
            }}
          />
        )}
      </form>
    </AuthSec>
  );
}
