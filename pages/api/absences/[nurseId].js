import dbConnect from "../../../db/connect";
import Absence from "@/db/models/Absence";

export default async function handler(request, response) {
  await dbConnect();
  const { nurseId } = request.query;

  if (request.method === "GET") {
    try {
      const absences = await Absence.find({ nurseId });
      return response.status(200).json(absences);
    } catch (error) {
      return response
        .status(500)
        .json({ status: "Error fetching nurse absences." });
    }
  }

  if (request.method === "DELETE") {
    const { absenceId } = request.body;
    try {
      const deletedAbsence = await Absence.findByIdAndDelete(absenceId);
      if (!deletedAbsence) {
        return response
          .status(404)
          .json({ error: "Absence not found for deletion." });
      }
      return response.status(200).json({ status: "Absence removed!" });
    } catch (error) {
      return response.status(500).json({ status: "Error deleting absence." });
    }
  }
}
