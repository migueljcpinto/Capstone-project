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
    const { workDateId, dayOffToRemove } = request.body;
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

      if (dayOffToRemove) {
        nurseWorkDates.daysOff = nurseWorkDates.daysOff.filter(
          (date) => date.toISOString() !== dayOffToRemove
        );
        await nurseWorkDates.save();
      } else {
        const index = nurse.workSchedule.indexOf(workDateId);
        if (index > -1) {
          nurse.workSchedule.splice(index, 1);
          await nurse.save();
        }
        await nurseWorkDates.remove();
      }

      return response.status(200).json({ status: "Date removed successfully" });
    } catch (error) {
      return response.status(500).json({ status: "Error removing date." });
    }
  }
}
