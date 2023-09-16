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
    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (response.error) {
      setErrorMessage(response.error);
    } else {
      router.push("/dashboard");
    }
  }

  //GitHub Login
  async function handleGithubLogin() {
    signIn("github", {
      callbackUrl: "https://capstone-project-myteam.vercel.app/dashboard",
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

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
