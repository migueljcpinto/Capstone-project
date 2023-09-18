import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        await dbConnect();
        if (!dbConnect) {
          throw new Error("Failed to connect to the database.");
        }

        const user = await User.findOne({ email });
        if (!user) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          return null;
        }
        return {
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
export default NextAuth(authOptions);
