import dbConnect from "@/db/connect";
import Nurse from "@/db/models/Nurse";

export default async function handler(request, response) {
  const connection = await dbConnect();
  const { id } = request.query;

  if (!connection)
    return response
      .status(500)
      .json({ error: "Unable to connect to the database!" });

  if (request.method === "GET") {
    try {
      const nurse = await Nurse.findById(id);
      if (!nurse) {
        return response.status(404).json({ status: "Nurse not Found 🫣" });
      }
      response.status(200).json(nurse);
    } catch (error) {
      response.status(500).json({ status: "Error fetching nurse data." });
    }
  }

  if (request.method === "PUT") {
    try {
      const updatedNurse = request.body;
      //to return the updated data after the PUT method
      const updatedNurseData = await Nurse.findByIdAndUpdate(id, updatedNurse, {
        new: true,
      });
      if (!updatedNurseData) {
        return response
          .status(404)
          .json({ status: "Nurse not found for updating. 🫣" });
      }
      return response.status(200).json(updatedNurseData);
    } catch (error) {
      return response.status(500).json({ status: "Error updating nurse." });
    }
  }

  if (request.method === "DELETE") {
    try {
      const deleteNurse = await Nurse.findByIdAndDelete(id);
      if (!deleteNurse) {
        return response
          .status(404)
          .json({ error: "Nurse not found for deletion." });
      }
      return response.status(200).json({ status: "The Nurse was fired!" });
    } catch (error) {
      return response.status(500).json({ error: "Error deleting nurse." });
    }
  }
}
