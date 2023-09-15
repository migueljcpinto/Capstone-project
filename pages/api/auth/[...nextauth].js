import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, request) {
        console.log("Connecting to DB...");

        await dbConnect().catch((error) => {
          throw new Error("Connection Failed!");
        });
        console.log("Connected to DB.");

        //check user existance
        console.log("Fetching user...");
        const result = await User.findOne({ email: credentials.email });
        console.log("User fetched:", result);

        if (!result) {
          throw new Error("No User found with Email. Please Sign Up!");
        }

        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password does not match!");
        }

        return {
          name: result.name,
          email: result.email,
          image: result.image,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
