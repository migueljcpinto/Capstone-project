import dbConnect from "@/db/connect";
import Nurse from "@/db/models/Nurse";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const nurse = await Nurse.findById(id);

    if (!nurse) {
      return response.status(404).json({ status: "Team not Found 🫣" });
    }

    response.status(200).json(nurse);
  }

  if (request.method === "PUT") {
    await Nurse.findByIdAndUpdate(id, {
      $set: request.body,
    });

    response
      .status(200)
      .json({ status: "Yes!!! Nurse updated successfully! 🍻" });
  }
}
