import { useState, useEffect } from "react";
import { AvailabilityDatePicker } from "../DatePicker/AvailabilityDatePicker";
import Modal from "../Modals/Modal";
import { ScheduleFormContainer, Button } from "./WorkScheduleForm.styled";

export default function AvailabilityForm({
  onAvailabilitySubmit,
  excludeDates,
}) {
  const [selectedAvailabilityDate, setSelectedAvailabilityDate] =
    useState(null);
  const [selectedShift, setSelectedShift] = useState("");
  const [resetAvailability, setResetAvailability] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  async function handleAvailabilitySubmit(event) {
    event.preventDefault();
    if (!selectedShift || !selectedAvailabilityDate) {
      setModalMessage("Please select a shift before submitting.");
      setShowModal(true);
      return;
    }
    if (selectedAvailabilityDate && selectedShift) {
      const formAvailabilityData = {
        availability: {
          date: selectedAvailabilityDate,
          shift: selectedShift,
        },
      };
      const response = await onAvailabilitySubmit(formAvailabilityData);

      if (response && response.ok) {
        setSelectedAvailabilityDate(null);
        setSelectedShift("");
        setResetAvailability(true);
      } else {
        const errorData = await response.json();
        if (errorData.error === "You can only have 5 availabilities.") {
          setModalMessage(
            "You have already added 5 availabilities. You can't add more."
          );
          setShowModal(true);
        } else {
          console.error("Please select a date and a shift for availability.");
        }
      }
    }
  }

  useEffect(() => {
    if (resetAvailability) {
      setResetAvailability(false);
    }
  }, [resetAvailability]);

  return (
    <ScheduleFormContainer>
      <AvailabilityDatePicker
        excludeDates={excludeDates}
        onDateChange={(date) => {
          setSelectedAvailabilityDate(date);
        }}
        onShiftChange={(shift) => {
          setSelectedShift(shift);
        }}
      />
      <Button onClick={handleAvailabilitySubmit} disabled={!selectedShift}>
        Request Availability
      </Button>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          title="Notification"
          message={modalMessage}
          buttonText="Ok"
          buttonAction={() => setShowModal(false)}
        />
      )}
    </ScheduleFormContainer>
  );
}
