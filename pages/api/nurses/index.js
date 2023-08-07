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
}
