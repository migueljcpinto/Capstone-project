import dbConnect from "../../../db/connect";
import Nurse from "@/db/models/Nurse";

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
}
