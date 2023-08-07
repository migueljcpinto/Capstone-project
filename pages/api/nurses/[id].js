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
      const updatedNurseData = await Nurse.findByIdAndUpdate(id, updatedNurse);
      if (!updatedNurseData) {
        return response.status(404).json({ status: "Nurse not Updated 🫣" });
      }
      return response.status(200).json(updatedNurseData);
    } catch (error) {
      return response.status(500).json({ status: "Error updating nurse." });
    }
  }

  if (request.method === "POST") {
    try {
      const nurseData = request.body;
      const newNurse = await Nurse.create(nurseData);
      return response.status(201).json(newNurse);
    } catch (error) {
      return response.status(500).json({ error: "Error adding nurse." });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Nurse.findByIdAndDelete(id);
      return response.status(200).json({ status: "The Nurse was fired!" });
    } catch (error) {
      return response.status(405).json({ error: "Method not allowed!" });
    }
  }
}
