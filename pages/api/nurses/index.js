import dbConnect from "@/db/connect";
import Nurse from "@/db/models/Nurse";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const nurses = await Nurse.find();
    return response.status(200).json(nurses);
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
}
