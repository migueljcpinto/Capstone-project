import dbConnect from "@/db/connect";
import Shift from "@/db/models/Shift";

export default async function handler(request, response) {
  await dbConnect();
  const { date } = request.query;

  if (request.method === "GET") {
    try {
      const shift = await Shift.findOne({ date: new Date(date) }).populate([
        "morningShift",
        "afternoonShift",
        "nightShift",
      ]);
      if (!shift) {
        return response
          .status(404)
          .json({ status: "Shift not found for the given date." });
      }
      return response.status(200).json(shift);
    } catch (error) {
      return response
        .status(500)
        .json({ status: "Error fetching shift data." });
    }
  }

  if (request.method === "PUT") {
    try {
      const { morningShift, afternoonShift, nightShift } = request.body;
      const updatedShift = await Shift.findOneAndUpdate(
        { date: new Date(date) },
        { morningShift, afternoonShift, nightShift },
        { new: true }
      ).populate(["morningShift", "afternoonShift", "nightShift"]);

      if (!updatedShift) {
        return response
          .status(404)
          .json({ status: "Shift not found for the given date." });
      }
      return response.status(200).json(updatedShift);
    } catch (error) {
      return response
        .status(500)
        .json({ status: "Error updating shift data." });
    }
  }
}
