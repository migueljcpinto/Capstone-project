import dbConnect from "@/db/connect";
import Availability from "@/db/models/Availability";

export default async function handler(request, response) {
  const connection = await dbConnect();
  console.log("Received availability data:", request.body);

  if (!connection)
    return response
      .status(500)
      .json({ error: "Unable to connect to the database!" });

  if (request.method === "GET") {
    try {
      const availability = await Availability.find();
      return response.status(200).json(availability);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error fetching the availability data." });
    }
  }

  if (request.method === "POST") {
    const { nurseId, type, date } = request.body;

    // validation
    if (!nurseId || !type || !date) {
      return response.status(400).json({ error: "Incomplete data provided." });
    }

    try {
      if (Array.isArray(date)) {
        const availability = date.map((d) => ({ nurseId, type, date: d }));
        await Availability.insertMany(availability);
      } else {
        await Availability.create(request.body);
      }
      return response.status(201).json({ message: "Availability added!" });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error adding Availability.", details: error.message });
    }
  }

  return response.status(405).json({ error: "Method not allowed." });
}
