import LoginForm from "@/components/SignUp&Login/LoginForm";
import { AuthContainer } from "@/components/SignUp&Login/SignUp&Login.styled";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "@/components/Modals/Modal";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import GreenCheckIcon from "@/utilities/Icons/GreenCheckIcon";
import WarningIcon from "@/utilities/Icons/WarningIcon";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const isValidEmail = (email) =>
    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);

  // This function handles the form submission for user login
  async function handleSubmit({ email, password }) {
    if (!email || !isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setShowErrorModal(true);
      return;
    }

    if (!password) {
      setErrorMessage("The password field is empty.");
      setShowErrorModal(true);
      return;
    }

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response.error) {
      console.error("Error during signIn:", response);
      setErrorMessage("Invalid credentials or an unexpected error occurred.");
      setShowErrorModal(true);
    } else {
      setShowSuccessModal(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }
  }

  return (
    <>
      <AuthContainer>
        <LoginForm onFormSubmit={handleSubmit} errorMessage={errorMessage} />
      </AuthContainer>

      {showSuccessModal && (
        <Modal
          setShowModal={setShowSuccessModal}
          title="WELCOME ABOARD!"
          IconComponent={GreenCheckIcon}
          message="Successful login! Redirecting..."
          buttonText="Let´Go!"
          type="success"
        />
      )}

      {showErrorModal && (
        <Modal
          setShowModal={setShowErrorModal}
          title="Oh No!"
          IconComponent={WarningIcon}
          message={errorMessage}
          buttonText="Close"
          type="error"
        />
      )}
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
