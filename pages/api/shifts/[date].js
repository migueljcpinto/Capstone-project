import dbConnect from "@/db/connect";
import Nurse from "@/db/models/Nurse";
import Shift from "@/db/models/Shift";

export default async function handler(request, response) {
  await dbConnect();
  const { date } = request.query;

  if (request.method === "GET") {
    try {
      const shift = await Shift.findOne({ date: new Date(date) })
        .populate("morningShift")
        .populate("afternoonShift")
        .populate("nightShift");
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
      const { nurseId, shiftType } = request.body;
      console.log("Received nurseId:", nurseId);
      console.log("Received shiftType:", shiftType);

      const nurse = await Nurse.findById(nurseId);

      if (!nurse) {
        return response
          .status(400)
          .json({ status: `Nurse with ID ${nurseId} not found.` });
      }

      let shiftForDate = await Shift.findOne({ date: new Date(date) });

      if (!shiftForDate) {
        // Se o turno para a data não existir, crie um novo
        shiftForDate = await Shift.create({
          date: new Date(date),
          [`${shiftType}Shift`]: [nurseId],
        });
      } else {
        // Se o turno para a data existir, atualize-o
        await Shift.updateOne(
          { date: new Date(date) },
          { $push: { [`${shiftType}Shift`]: nurseId } }
        );
      }

      const updatedShift = await Shift.findOne({ date: new Date(date) })
        .populate("morningShift")
        .populate("afternoonShift")
        .populate("nightShift");

      return response.status(200).json(updatedShift);
    } catch (error) {
      console.error("Mongoose error:", error);
      return response
        .status(500)
        .json({ status: "Error updating shift data." });
    }
  }
  return response.status(405).json({ status: "Method not allowed." });
}
