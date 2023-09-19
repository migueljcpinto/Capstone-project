import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { hash } from "bcryptjs";

export default async function handler(request, response) {
  await dbConnect().catch((error) => {
    throw new Error("Connection Failed!");
  });

  if (request.method === "POST") {
    if (!request.body) {
      return response.status(400).json({ error: "Don't have form data!" });
    }

    const { name, email, password, image } = request.body;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return response.status(422).json({ message: "Email format is invalid!" });
    }
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
        image,
      });
      return response.status(201).json({ status: true, user });
    } catch (err) {
      console.error("Error during user creation:", err);
      return response.status(500).json({ error: err.message });
    }
  } else {
    return response
      .status(405)
      .json({ message: "HTTP method not valid, only POST Accepted!" });
  }
}
