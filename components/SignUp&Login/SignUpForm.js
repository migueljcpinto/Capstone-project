import Link from "next/link";
import {
  EnjoyText,
  AuthButton,
  AuthInput,
  AuthSec,
  AuthText,
  SuccessModal,
  SuccessOverlay,
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
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          $hasError={!!errors.name}
        />
        {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}

        <label htmlFor="email"></label>
        <AuthInput
          id="email"
          type="text"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          $hasError={!!errors.email}
        />
        {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}

        <label htmlFor="password"></label>
        <AuthInput
          id="password"
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          $hasError={!!errors.password}
        />
        {errors.password && (
          <small style={{ color: "red" }}>{errors.password}</small>
        )}

        <label htmlFor="confirmPassword"></label>
        <AuthInput
          id="confirmPassword"
          type="password"
          placeholder="confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          $hasError={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <small style={{ color: "red" }}>{errors.confirmPassword}</small>
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
