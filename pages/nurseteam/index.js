import LoaderSpinner from "@/components/LoaderSpinner/AmbulanceLoading";
import Modal from "@/components/Modals/Modal";
import NurseTeam from "@/components/NurseTeam/NurseTeam";
import WarningIcon from "@/utilities/Icons/WarningIcon";
import { useState } from "react";
import useSWR from "swr";

export default function Team() {
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { data, isLoading } = useSWR("/api/nurses");
  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!data) {
    return (
      <>
        <Modal
          title="Error"
          buttonText="Ok"
          IconComponent={WarningIcon}
          buttonAction={() => {
            setShowErrorModal(false);
          }}
        >
          <p>You have no Team! 😩</p>
          <p>Please try again later</p>
        </Modal>{" "}
      </>
    );
  }
  return <NurseTeam nurses={data} />;
}
