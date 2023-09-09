import dbConnect from "@/db/connect";
import Nurse from "@/db/models/Nurse";
import Shift from "@/db/models/Shift";

export default async function handler(request, response) {
  await dbConnect();
  const { date } = request.query;

  //API endpoint handler for managing nurse shifts based on the date

  switch (request.method) {
    case "GET":
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
        console.error("Error fetching shift:", error);
        return response
          .status(500)
          .json({ status: "Error fetching shift data." });
      }

    case "PUT":
      try {
        const { nurseId, shiftType } = request.body;

        const nurse = await Nurse.findById(nurseId);

        if (!nurse) {
          return response
            .status(400)
            .json({ status: `Nurse with ID ${nurseId} not found.` });
        }

        let shiftForDate = await Shift.findOne({ date: new Date(date) });

        if (!shiftForDate) {
          // If the shift do not exist, create one
          shiftForDate = await Shift.create({
            date: new Date(date),
            [`${shiftType}Shift`]: [nurseId],
          });
        } else {
          // If the shift exist, update it
          await Shift.updateOne(
            { date: new Date(date) },
            { $addToSet: { [shiftType]: nurseId } }
          );
        }

        const updatedShift = await Shift.findOne({ date: new Date(date) })
          .populate("morningShift")
          .populate("afternoonShift")
          .populate("nightShift");

        return response.status(200).json(updatedShift.toObject());
      } catch (error) {
        console.error("Mongoose error:", error);
        return response
          .status(500)
          .json({ status: "Error updating shift data." });
      }

    case "POST":
      try {
        const { date } = request.body;
        const newShift = await Shift.create({ date: new Date(date) });
        return response.status(201).json(newShift);
      } catch (error) {
        return response.status(500).json({ status: "Error creating shift." });
      }

    case "DELETE":
      try {
        const { nurseId, shiftType } = request.body;

        const shiftForDate = await Shift.findOne({ date: new Date(date) });

        if (!shiftForDate) {
          return response
            .status(404)
            .json({ status: "Shift not found for the given date." });
        }

        if (!shiftForDate[shiftType]) {
          console.error(
            `Shift type ${shiftType} not found for the given date.`
          );
          return response.status(404).json({
            status: `Shift type ${shiftType} not found for the given date.`,
          });
        }

        // Remove the nurseId from the specific shiftType
        shiftForDate[`${shiftType}Shift`] = shiftForDate[
          `${shiftType}Shift`
        ].filter((id) => id.toString() !== nurseId);

        await shiftForDate.save();

        const updatedShift = await Shift.findOne({ date: new Date(date) })
          .populate("morningShift")
          .populate("afternoonShift")
          .populate("nightShift");

        return response.status(200).json(updatedShift);
      } catch (error) {
        console.error("Error removing nurse from shift:", error);
        return response
          .status(500)
          .json({ status: "Error removing nurse from shift." });
      }

    default:
      return response.status(405).json({ status: "Method not allowed." });
  }
}
