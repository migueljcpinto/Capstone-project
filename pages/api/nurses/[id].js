import dbConnect from "@/db/connect";
import Nurse from "@/db/models/Nurse";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const nurse = await Nurse.findById(request.query.id);

    if (!nurse) {
      return response.status(404).json({ status: "You have no team 😩!" });
    }
    response.status(200).json(nurse);
  }
}
