import LoginForm from "@/components/SignUp&Login/LoginForm";
import { AuthContainer } from "@/components/SignUp&Login/SignUp&Login.styled";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { getSession } from "next-auth/react";
import Success from "@/components/SignUp&Login/Success";
export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

    if (response.error) {
      setErrorMessage(response.error);
    } else {
      setShowSuccessMessage(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  }

  return (
    <>
      {showSuccessMessage ? (
        <Success
          setShowModal={setShowSuccessMessage}
          message="Successful login! Redirecting..."
          showButton={false}
        />
      ) : (
        <AuthContainer>
          <LoginForm onFormSubmit={handleSubmit} errorMessage={errorMessage} />
        </AuthContainer>
      )}
      ;
    </>
  );
}
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log("login", session);
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
