import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { hash } from "bcryptjs";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    return response.status(500).json({ error: "Connection Failed!" });
  }

  if (request.method === "POST") {
    if (!request.body) {
      return response.status(400).json({ error: "Don't have form data!" });
    }

    const { name, email, password } = request.body;

    //check duplicate users
    const checkExistingUsers = await User.findOne({ email });
    if (checkExistingUsers)
      return response.status(422).json({ message: "User Already Exists!" });

    try {
      // Hash password and create user
      const hashedPassword = await hash(password, 12);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      return response.status(201).json({ status: true, user });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  } else {
    return response
      .status(405)
      .json({ message: "HTTP method not valid, only POST Accepted!" });
  }
}
