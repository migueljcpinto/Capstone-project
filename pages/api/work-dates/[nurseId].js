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
      response.status(200).json(nurse.workSchedule);
    } catch (error) {
      response.status(500).json({ status: "Error fetching nurse work dates." });
    }
  }

  if (request.method === "PUT") {
    const { workDateId, dateRange } = request.body;
    try {
      const workDate = await NurseWorkDates.findById(workDateId);
      if (!workDate) {
        return response.status(404).json({ status: "Work date not found 😕" });
      }
      workDate.vacationDates = dateRange; // or other that I want to update
      await workDate.save();
      response.status(200).json({ status: "Date updated successfully!" });
    } catch (error) {
      response.status(500).json({ status: "Error updating date." });
    }
  }

  if (request.method === "DELETE") {
    const { workDateId } = request.body;
    try {
      await NurseWorkDates.findByIdAndDelete(workDateId);
      const nurse = await Nurse.findById(nurseId);
      if (!nurse) {
        return response.status(404).json({ status: "Nurse not Found 🫣" });
      }
      const index = nurse.workSchedule.indexOf(workDateId);
      if (index > -1) {
        nurse.workSchedule.splice(index, 1);
        await nurse.save();
      }
      response.status(200).json({ status: "Date removed successfully" });
    } catch (error) {
      response.status(500).json({ status: "Error removing date." });
    }
  }
}
