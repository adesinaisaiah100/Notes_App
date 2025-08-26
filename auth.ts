import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "./models/user";
import { connectToDatabase } from "@/utils/database";

const GITHUB_ID = process.env.GITHUB_ID || "default-github-id";
const GITHUB_SECRET = process.env.GITHUB_SECRET || "default-github-secret";
const GOOGLE_ID = process.env.GOOGLE_ID || "default-google-id";
const GOOGLE_SECRET = process.env.GOOGLE_SECRET || "default-google-secret";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        if (session.user) {
          await connectToDatabase();
          const user = await User.findOne({ email: session.user.email });
          session.user.name = user?.name || session.user.email;
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
    async signIn({ user }) {
      try {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({ name: user.name, email: user.email });
        }
        return true;
      } catch (e) {
        console.error("Sign-in callback error:", e);
        return false;
      }
    },
  },
});

export { handlers as GET, handlers as POST };