import dbConnect from "@/db/connect";
import Nurse from "@/db/models/Nurse";

export default async function handler(request, response) {
  const connection = await dbConnect();
  if (!connection)
    return response
      .status(500)
      .json({ error: "Unable to connect to the database!" });

  if (request.method === "GET") {
    try {
      const nurses = await Nurse.find();
      return response.status(200).json(nurses);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error fetching the nurse data." });
    }
  }
  if (request.method === "POST") {
    try {
      const nurseData = request.body;
      await Nurse.create(nurseData);
      response.status(201).json({ message: "Nurse added!🍻" });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
  return response.status(405).json({ error: "Method not allowed" });
}
