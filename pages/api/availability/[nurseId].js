import dbConnect from "../../../db/connect";
import Availability from "@/db/models/Availability";

export default async function handler(request, response) {
  await dbConnect();
  const { nurseId } = request.query;
  console.log("Received availability data:", request.body);
  if (request.method === "GET") {
    try {
      const availability = await Availability.find({ nurseId });
      return response.status(200).json(availability);
    } catch (error) {
      return response
        .status(500)
        .json({ status: "Error fetching nurse availability." });
    }
  }

  if (request.method === "DELETE") {
    const { availabilityId } = request.body;
    try {
      const deletedAvailability = await Availability.findByIdAndDelete(
        availabilityId
      );
      if (!deletedAvailability) {
        return response
          .status(404)
          .json({ error: "Availability not found for deletion." });
      }
      return response.status(200).json({ status: "Availability removed!" });
    } catch (error) {
      return response
        .status(500)
        .json({ status: "Error deleting Availability." });
    }
  }
  return response.status(405).json({ error: "Method not allowed." });
}
