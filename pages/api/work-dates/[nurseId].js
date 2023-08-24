import dbConnect from "../../../db/connect";
import Nurse from "@/db/models/Nurse";
import NurseWorkDates from "@/db/models/NurseWorkDates";

export default async function handler(request, response) {
  const connection = await dbConnect();
  const { nurseId } = request.query;

  if (!connection)
    return response
      .status(500)
      .json({ error: "Unable to connect to the database!" });

  if (request.method === "GET") {
    try {
      const nurse = await Nurse.findById(nurseId).populate("workSchedule");
      if (!nurse) {
        return response.status(404).json({ status: "Nurse not Found 🫣" });
      }
      return response.status(200).json(nurse.workSchedule);
    } catch (error) {
      return response
        .status(500)
        .json({ status: "Error fetching nurse work dates." });
    }
  }

  if (request.method === "DELETE") {
    console.log("DELETE method initiated for nurseId:", nurseId);
    console.log("Received values in request body:", request.body);

    const { workDateId, vacationDateToRemove, dayOffToRemove } = request.body;

    if (!vacationDateToRemove && !dayOffToRemove) {
      return response
        .status(400)
        .json({ status: "Invalid request. Missing parameters." });
    }

    try {
      console.log("Trying to find the nurse");

      //First, where is the Nurse!?
      const nurse = await Nurse.findById(nurseId);
      if (!nurse) {
        console.log("Nurse not found");

        return response.status(404).json({ status: "Nurse not Found 🫣" });
      }
      console.log("Found nurse with ID:", nurse._id);

      //Second, How the Nurse wanted to work?!
      const nurseWorkDates = await NurseWorkDates.findById(workDateId);
      if (!nurseWorkDates) {
        console.log("Work dates not found");

        return response.status(404).json({ status: "Work dates not found" });
      }
      console.log("Found nurse work dates with ID:", nurseWorkDates._id); // 4
      if (vacationDateToRemove) {
        console.log(
          "Updating vacation dates. Current dates:",
          nurseWorkDates.vacationDates
        ); // 5
        nurseWorkDates.vacationDates = nurseWorkDates.vacationDates.filter(
          (range) =>
            range.startDate.toISOString() !== vacationDateToRemove.startDate &&
            range.endDate.toISOString() !== vacationDateToRemove.endDate
        );
        await nurseWorkDates.save();

        console.log(
          "Updated vacation dates. New dates:",
          nurseWorkDates.vacationDates
        ); // 6
      } else if (dayOffToRemove) {
        console.log("Updating days off. Current days:", nurseWorkDates.daysOff); // 7

        nurseWorkDates.daysOff = nurseWorkDates.daysOff.filter(
          (date) => date.toISOString() !== dayOffToRemove
        );
        await nurseWorkDates.save();
      }
      //Check to remove entire document if both arrays are empty
      if (
        nurseWorkDates.vacationDates.length === 0 &&
        nurseWorkDates.daysOff.length === 0
      ) {
        console.log(
          "Both arrays are empty. Removing entire work dates document with ID:",
          workDateId
        );

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
      console.error("Error during DELETE:", error); // 10

      return response.status(500).json({ status: "Error removing date." });
    }
  }
}
