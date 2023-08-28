import dbConnect from "../../../db/connect";
import NurseWorkDates from "@/db/models/NurseWorkDates";
import Nurse from "@/db/models/Nurse";

export default async function handler(request, response) {
  const connection = await dbConnect();

  if (!connection)
    return response
      .status(500)
      .json({ error: "Unable to connect to the database!" });

  if (request.method === "GET") {
    try {
      const workDates = await NurseWorkDates.find();
      return response.status(200).json(workDates);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error fetching the nurse Work Data." });
    }
  }
  if (request.method === "POST") {
    console.log("Received data for POST request:", request.body);

    try {
      const { nurseId, vacationDates, daysOff /* availability */ } =
        request.body;

      console.log("Received vacationDates:", vacationDates);
      console.log("Received daysOff:", daysOff);

      //checking if it is the correct format
      if (
        (!vacationDates || Array.isArray(vacationDates)) &&
        (!daysOff || Array.isArray(daysOff))
      ) {
        // process the request
      } else {
        return response.status(400).json({ error: "Invalid data format." });
      }

      const workDatesData = {
        vacationDates,
        daysOff: daysOff || [] /* availability */,
      };

      console.log(
        "Preparing to create NurseWorkDates with data:",
        workDatesData
      );

      const workDates = await NurseWorkDates.create(workDatesData); //work dates for the nurse

      console.log("Created NurseWorkDates:", workDates);

      if (!workDates) {
        return response
          .status(500)
          .json({ error: "Failed to create work dates." });
      }

      await Nurse.findByIdAndUpdate(nurseId, {
        $push: { workSchedule: workDates._id }, //updating
      });
      response
        .status(201)
        .json({ status: "Schedule Dates created", data: workDates });
    } catch (error) {
      console.error("Error processing POST request:", error);
      response.status(500).json({ error: "Failed to create work dates." });
    }
  }
}
