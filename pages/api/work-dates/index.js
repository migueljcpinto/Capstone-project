import dbConnect from "../../../db/connect";
import NurseWorkDates from "@/db/models/NurseWorkDates";
import Nurse from "@/db/models/Nurse";

export default async function handler(request, response) {
  const connection = await dbConnect();

  if (!connection)
    return response
      .status(500)
      .json({ error: "Unable to connect to the database!" });

  if (request.method === "GET") {
    try {
      const workDates = await NurseWorkDates.find();
      return response.status(200).json(workDates);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error fetching the nurse Work Data." });
    }
  }
  if (request.method === "POST") {
    try {
      const { nurseId, ...workDatesData } = request.body;
      const workDates = await NurseWorkDates.create(workDatesData); //work dates for the nurse
      await Nurse.findByIdAndUpdate(nurseId, {
        $push: { workSchedule: workDates._id }, //updating
      });
      response
        .status(201)
        .json({ status: "Schedule Dates created", data: workDates });
    } catch (error) {
      console.error("Error creating work dates:", error);
      response.status(500).json({ error: "Failed to create work dates." });
    }
  }
}
