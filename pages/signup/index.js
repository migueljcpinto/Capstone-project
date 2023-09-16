import SignUpForm from "@/components/SignUp&Login/SignUpForm";
import { AuthContainer } from "@/components/SignUp&Login/SignUp&Login.styled";
import { useState } from "react";
import getRandomImageURL from "@/utilities/getRandomImageURL";
import { getSession } from "next-auth/react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showModal, setShowModal] = useState(false);

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
    setErrors((prevState) => ({ ...prevState, [id]: "" })); // Clear error on change
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let validationErrors = {};

    formData.image = getRandomImageURL();

    // Validations
    if (formData.name.length < 3) {
      validationErrors.name = "Username should be at least 3 characters long.";
    }

    if (!formData.email.includes("@")) {
      validationErrors.email = "Please enter a valid email.";
    }

    if (formData.password.length < 6) {
      validationErrors.password =
        "Password should be at least 6 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.name || !formData.email || !formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "Required fields are missing!",
      }));
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Log the form data
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        setShowModal(true);
      } else {
        console.error("Error creating user:", data.message);
      }
    } catch (error) {
      console.error("There was an error:", error);
    }
  }

  return (
    <AuthContainer>
      <SignUpForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        errors={errors}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </AuthContainer>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/dashboard", // Redirecionar para o dashboard se o usuário já estiver logado
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
