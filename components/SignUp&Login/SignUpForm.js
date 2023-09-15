import Link from "next/link";
import {
  EnjoyText,
  AuthButton,
  AuthInput,
  AuthSec,
  AuthText,
  SuccessModal,
  SuccessOverlay,
  ErrorMessage,
} from "./SignUp&Login.styled";
import { useRouter } from "next/router";

export default function SignUpForm({
  handleSubmit,
  handleChange,
  formData,
  errors,
  showModal,
  setShowModal,
}) {
  const router = useRouter();

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
        <label htmlFor="password"></label>
        <AuthInput
          id="password"
          type="password"
          placeholder=" Password"
          value={formData.password}
          onChange={handleChange}
          $hasError={!!errors.password}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <label htmlFor="confirmPassword"></label>
        <AuthInput
          id="confirmPassword"
          type="password"
          placeholder=" Confirm the password"
          value={formData.confirmPassword}
          onChange={handleChange}
          $hasError={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}

        <AuthButton type="submit">Create Account</AuthButton>
        <EnjoyText>
          Already Have An Account? <Link href={"/login"}>Log In</Link>
        </EnjoyText>
        {showModal && (
          <>
            <SuccessOverlay></SuccessOverlay>
            <SuccessModal>
              User created successfully! You can now log in.
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push("/login");
                }}
              >
                Close
              </button>{" "}
            </SuccessModal>
          </>
        )}
      </form>
    </AuthSec>
  );
}
