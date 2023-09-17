import LoginForm from "@/components/SignUp&Login/LoginForm";
import { AuthContainer } from "@/components/SignUp&Login/SignUp&Login.styled";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { AmbulanceLoader } from "@/components/LoaderSpinner/AmbulanceLoading.styled";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) =>
    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);

  // This function handles the form submission for user login
  async function handleSubmit({ email, password }) {
    setIsLoading(true);
    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setIsLoading(false);
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

  return (
    <>
      {isLoading ? (
        <AmbulanceLoader />
      ) : (
        <AuthContainer>
          <LoginForm
            onFormSubmit={handleSubmit}
            errorMessage={errorMessage}
            isLoading={isLoading}
          />
        </AuthContainer>
      )}
    </>
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
