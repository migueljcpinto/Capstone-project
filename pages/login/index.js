import LoginForm from "@/components/SignUp&Login/LoginForm";
import { AuthContainer } from "@/components/SignUp&Login/SignUp&Login.styled";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { AmbulanceLoader } from "@/components/LoaderSpinner/AmbulanceLoading.styled";
import Success from "@/components/SignUp&Login/Success";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const isValidEmail = (email) =>
    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);

  // This function handles the form submission for user login
  async function handleSubmit({ email, password }) {
    if (!email || !isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setErrorMessage("The password field is empty.");
      return;
    }

    setIsLoading(true);
    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard",
    });
    setIsLoading(false);

    if (!response.error) {
      console.error("Error during signIn:", response);
      setErrorMessage("Invalid credentials or an unexpected error occurred.");
    } else {
      setShowSuccessMessage(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  }

  return (
    <>
      {isLoading ? (
        <AmbulanceLoader />
      ) : showSuccessMessage ? (
        <Success
          setShowModal={setShowSuccessMessage}
          message="Successful login! Redirecting..."
          showButton={false}
        />
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
    props: { session },
  };
}
