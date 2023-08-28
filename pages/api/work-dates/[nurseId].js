import dbConnect from "../../../db/connect";
import Nurse from "@/db/models/Nurse";
import NurseWorkDates from "@/db/models/NurseWorkDates";

export default async function handler(request, response) {
  await dbConnect();
  const { nurseId } = request.query;

  if (request.method === "GET") {
    try {
      const nurse = await Nurse.findById(nurseId).populate("workSchedule");
      if (!nurse)
        return response.status(404).json({ status: "Nurse not Found 🫣" });
      return response.status(200).json(nurse.workSchedule);
    } catch (error) {
      return response
        .status(500)
        .json({ status: "Error fetching nurse work dates." });
    }
  }

  if (request.method === "DELETE") {
    console.log("Received data for DELETE request:", request.body);
    const { workDateId, vacationDateToRemove, dayOffToRemove } = request.body;

    if (!vacationDateToRemove && !dayOffToRemove) {
      return response
        .status(400)
        .json({ status: "Invalid request. Missing parameters." });
    }

    try {
      //First, where is the Nurse!?
      const nurse = await Nurse.findById(nurseId);
      if (!nurse) {
        return response.status(404).json({ status: "Nurse not Found 🫣" });
      }

      //Second, How the Nurse wanted to work?!
      const nurseWorkDates = await NurseWorkDates.findById(workDateId);
      if (!nurseWorkDates) {
        return response.status(404).json({ status: "Work dates not found" });
      }

      nurseWorkDates.vacationDates = nurseWorkDates.vacationDates.filter(
        (range) => range.startDate && range.endDate
      );

      if (vacationDateToRemove) {
        nurseWorkDates.vacationDates = nurseWorkDates.vacationDates.filter(
          (range) =>
            range.startDate.toISOString() !== vacationDateToRemove.startDate &&
            range.endDate.toISOString() !== vacationDateToRemove.endDate
        );
      } else if (dayOffToRemove) {
        // format Date validation
        const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
        if (!isoDatePattern.test(dayOffToRemove)) {
          return response.status(400).json({ status: "Invalid date format." });
        }

        // converting to object date
        const dateToRemove = new Date(dayOffToRemove);
        if (isNaN(dateToRemove.getTime())) {
          return response.status(400).json({ status: "Invalid date." });
        }

        nurseWorkDates.daysOff = nurseWorkDates.daysOff.filter(
          (date) => date.toISOString() !== dayOffToRemove
        );
      }
      await nurseWorkDates.save();
      //Check to remove entire document if both arrays are empty
      if (
        !nurseWorkDates.vacationDates.length &&
        !nurseWorkDates.daysOff.length
      ) {
        const index = nurse.workSchedule.indexOf(workDateId);
        if (index > -1) {
          nurse.workSchedule.splice(index, 1);
          await nurse.save();
        }
        await NurseWorkDates.deleteOne({ _id: workDateId });
        return response
          .status(200)
          .json({ status: "Entire document removed successfully" });
      }

      return response.status(200).json({ status: "Date removed successfully" });
    } catch (error) {
      console.error("Error during DELETE operation:", error);
      return response.status(500).json({ status: "Error removing date." });
    }
  }
}
