import LoginForm from "@/components/SignUp&Login/LoginForm";
import { AuthContainer } from "@/components/SignUp&Login/SignUp&Login.styled";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { getSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (email) =>
    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);

  // This function handles the form submission for user login
  async function handleSubmit({ email, password }) {
    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("SignIn Response:", response);

    if (response.error) {
      setErrorMessage(response.error);
    } else {
      router.push("/");
    }
  }

  //GitHub Login
  async function handleGithubLogin() {
    signIn("github", {
      callbackUrl:
        "https://capstone-project-myteam-1gqlwjgt4-mikethebite.vercel.app/",
    });
  }

  return (
    <AuthContainer>
      <LoginForm
        onFormSubmit={handleSubmit}
        onGithubLogin={handleGithubLogin}
        errorMessage={errorMessage}
      />
    </AuthContainer>
  );
}