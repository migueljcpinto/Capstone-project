import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import bcrypt from "bcryptjs";

let GITHUB_ID, GITHUB_SECRET;

if (process.env.NODE_ENV === "development") {
  GITHUB_ID = process.env.LOCAL_GITHUB_ID;
  GITHUB_SECRET = process.env.LOCAL_GITHUB_SECRET;
} else if (process.env.APP_ENV === "staging") {
  GITHUB_ID = process.env.STAGING_GITHUB_ID;
  GITHUB_SECRET = process.env.STAGING_GITHUB_SECRET;
} else {
  GITHUB_ID = process.env.PRODUCTION_GITHUB_ID;
  GITHUB_SECRET = process.env.PRODUCTION_GITHUB_SECRET;
}

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        await dbConnect();

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
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
