import { ModalStyled, ModalOverlay } from "./Modal.styled";

export default function Modal({
  setShowModal,
  message,
  title = "Notification",
  IconComponent,
  buttonText = "Ok",
  buttonAction,
  showButton = true,
  type = "",
}) {
  return (
    <ModalOverlay>
      <ModalStyled type={type}>
        {IconComponent && <IconComponent />}
        <h4>{title}</h4>
        <p>{message}</p>
        <br />
        {showButton && (
          <button
            onClick={() => {
              setShowModal(false);
              if (buttonAction) buttonAction();
            }}
          >
            {buttonText}
          </button>
        )}{" "}
      </ModalStyled>
    </ModalOverlay>
  );
}
