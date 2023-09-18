import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        const { email, password } = credentials;
        console.log("Credentials:", credentials);

        await dbConnect();
        if (!dbConnect) {
          throw new Error("Failed to connect to the database.");
        }

        const user = await User.findOne({ email });
        console.log("User from DB:", user);
        if (!user) {
          throw new Error("Invalid credentials.");
        }
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          throw new Error("Invalid credentials.");
        }

        const sessionUser = {
          name: user.name,
          email: user.email,
          image: user.image,
        };
        console.log("Session User:", sessionUser);

        return sessionUser;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
