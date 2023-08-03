import dbConnect from "@/db/connect";
import Nurse from "@/db/models/Nurse";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

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
      await Nurse.findByIdAndUpdate(id, updatedNurse);

      if (!updatedNurse) {
        return response.status(404).json({ status: "Nurse not Updated 🫣" });
      }

      response.status(200).json(updatedNurse);
    } catch (error) {
      response.status(500).json({ status: "Error updating nurse." });
    }
  }

  if (request.method === "DELETE") {
    await Nurse.findByIdAndDelete(id);
    return response.status(200).json({ status: "The Nurse was fired!" });
  }
}
