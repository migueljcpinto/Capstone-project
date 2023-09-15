import LoginForm from "@/components/SignUp&Login/LoginForm";
import { AuthContainer } from "@/components/SignUp&Login/SignUp&Login.styled";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // This function handles the form submission for user login
  async function onSubmit(values) {
    const { name, email, password } = values;

    // Check if email or password is empty
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!email.trim().match(emailRegex)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const response = await signIn("credentials", {
      redirect: false,
      name: name,
      email: email,
      password: password,
    });

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
        onSubmit={onSubmit}
        onGithubLogin={handleGithubLogin}
        errorMessage={errorMessage}
      />
    </AuthContainer>
  );
}
