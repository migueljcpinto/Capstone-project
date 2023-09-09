/* import dbConnect from "@/db/connect";
import Shift from "@/db/models/Shift";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const { date } = request.body;
      const newShift = await Shift.create({ date: new Date(date) });
      return response.status(201).json(newShift);
    } catch (error) {
      return response.status(500).json({ status: "Error creating shift." });
    }
  }
}
 */
