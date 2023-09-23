import useSWR from "swr";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ScheduleTabs from "@/components/ScheduleTabs/ScheduleTabs";
import Modal from "@/components/Modals/Modal";
import WarningIcon from "@/utilities/Icons/WarningIcon";
import GreenCheckIcon from "@/utilities/Icons/GreenCheckIcon";

export default function SchedulePage() {
  const router = useRouter();
  const nurseId = router.query.id; //Nurse id
  const { data: nurseData } = useSWR(nurseId ? `/api/nurses/${nurseId}` : null);
  const { data: absencesData, mutate: mutateAbsencesData } = useSWR(
    nurseId ? `/api/absences/${nurseId}` : null
  );
  const { data: availabilityData, mutate: mutateAvailabilityData } = useSWR(
    nurseId ? `/api/availability/${nurseId}` : null
  );

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [daysOff, setDaysOff] = useState([]);

  const { data: absencesFromDB, error: absenceError } = useSWR(
    nurseId ? `/api/absences/${nurseId}` : null
  );
  const { data: availabilityDataFromSWR, error: availabilityError } = useSWR(
    nurseId ? `/api/availability/${nurseId}` : null
  );

  if (absenceError)
    console.error("Error searching the blocked dates:", absenceError);
  if (availabilityError)
    console.error("Error fetching availability:", availabilityError);

  const allAbsenceDates = absencesFromDB
    ? absencesFromDB.flatMap((absence) => absence.date)
    : [];
  const allAvailabilityDates = availabilityDataFromSWR
    ? availabilityDataFromSWR.map((availability) => availability.date)
    : [];

  const excludeDatesList = [
    ...daysOff,
    ...allAbsenceDates,
    ...allAvailabilityDates,
  ].map((dateStr) => new Date(dateStr));

  useEffect(() => {
    if (absenceError || availabilityError) {
      setShowErrorModal(true);
    }
  }, [absenceError, availabilityError]);

  async function handleRemoveAbsence(absenceId) {
    const response = await fetch(`/api/absences/${nurseId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ absenceId }),
    });

    if (response.ok) {
      setShowSuccessModal({ message: "Date deleted!", type: "remove" });
      mutateAbsencesData();
    }
  }

  async function handleRemoveAvailability(availabilityId) {
    const response = await fetch(`/api/availability/${nurseId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ availabilityId }),
    });

    if (response.ok) {
      setShowSuccessModal({ message: "Availability deleted!", type: "remove" });
      mutateAvailabilityData();
    }
  }

  async function handleVacationSubmit(formData) {
    const { vacationDates } = formData;
    const response = await fetch("/api/absences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nurseId: nurseId,
        type: "vacation",
        date: vacationDates,
      }),
    });

    if (response.ok) {
      setShowSuccessModal({ message: "Vacation Dates added!", type: "add" });
      mutateAbsencesData();
    } else {
      const errorData = await response.json();
      setShowErrorModal({
        message: errorData.error || "An error occurred!",
        type: "error",
      });
    }
  }

  async function handleDaysOffSubmit(formData) {
    const { daysOff } = formData;
    const response = await fetch("/api/absences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nurseId: nurseId,
        type: "dayOff",
        date: daysOff,
      }),
    });

    if (response.ok) {
      setShowSuccessModal({ message: "Days Off added!", type: "add" });
      mutateAbsencesData();
    }
  }

  async function handleAvailabilitySubmit(formData) {
    const { availability } = formData;
    const response = await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nurseId: nurseId,
        type: "availability",
        date: availability.date,
        shift: availability.shift,
      }),
    });

    if (response.ok) {
      setShowSuccessModal({ message: "Availability added!", type: "add" });
      mutateAvailabilityData();
    }
    return response;
  }

  return (
    <>
      {showErrorModal && (
        <Modal
          setShowModal={setShowErrorModal}
          title="Error"
          message="Something went wrong!"
          type="error"
          IconComponent={WarningIcon}
          buttonAction={() => {
            setShowErrorModal(false);
          }}
          buttonText="Ok!"
        />
      )}
      {showSuccessModal && (
        <Modal
          setShowModal={setShowSuccessModal}
          IconComponent={GreenCheckIcon}
          title="Done!"
          message={showSuccessModal.message}
          type={showSuccessModal.type}
          buttonAction={() => {
            setShowSuccessModal(false);
          }}
          buttonText="Ok!"
        />
      )}
      <ScheduleTabs
        onVacationSubmit={handleVacationSubmit}
        onDaysOffSubmit={handleDaysOffSubmit}
        onAvailabilitySubmit={handleAvailabilitySubmit}
        nurseData={nurseData}
        nurseId={nurseId}
        absenceDates={allAbsenceDates}
        availabilityDates={allAvailabilityDates}
        daysOff={daysOff}
        setDaysOff={setDaysOff}
        excludeDates={excludeDatesList}
        absencesData={absencesData}
        availabilityData={availabilityData}
        onAbsenceRemove={handleRemoveAbsence}
        onAvailabilityRemove={handleRemoveAvailability}
      />
    </>
  );
}
