import dbConnect from "@/db/connect";
import Nurse from "@/db/model/nurse";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const nurses = await Nurse.find();
    response.status(200).json(nurses);
  }
}
