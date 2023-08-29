import dbConnect from "@/db/connect";
import Absence from "@/db/models/Absence";

export default async function handler(request, response) {
  const connection = await dbConnect();

  if (!connection)
    return response
      .status(500)
      .json({ error: "Unable to connect to the database!" });

  if (request.method === "GET") {
    try {
      const absences = await Absence.find();
      return response.status(200).json(absences);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error fetching the absence data." });
    }
  }

  if (request.method === "POST") {
    try {
      const newAbsence = await Absence.create(request.body);
      return response.status(201).json(newAbsence);
    } catch (error) {
      return response.status(500).json({ error: "Error adding absence." });
    }
  }
}
