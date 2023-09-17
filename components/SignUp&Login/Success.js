import GreenCheckIcon from "@/utilities/Icons/GreenCheckIcon";
import { SuccessModal, SuccessOverlay } from "./SignUp&Login.styled";
import { useRouter } from "next/router";

export default function Success({
  setShowModal,
  message = "Your account has been successfully created!",
  showButton = true,
}) {
  const router = useRouter();

  return (
    <SuccessOverlay>
      <SuccessModal>
        <GreenCheckIcon />
        <h4>Welcome Aboard!</h4>
        <p>{message}</p>
        {showButton && (
          <button
            onClick={() => {
              setShowModal(false);
              router.push("/login");
            }}
          >
            Let´s Go!
          </button>
        )}{" "}
      </SuccessModal>
    </SuccessOverlay>
  );
}
