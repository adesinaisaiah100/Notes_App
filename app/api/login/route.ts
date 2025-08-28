import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User, { IUser } from "@/models/user";
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
          const user: IUser | null = await User.findOne({ email: session.user.email });
          if (user) {
            session.user.name = user.name || session.user.email;
            session.user.id = user._id.toString(); // Add user ID to session
          }
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
    async signIn({ user, account }) {
      try {
        await connectToDatabase();
        const existingUser: IUser | null = await User.findOne({ email: user.email });
        if (!existingUser) {
          // Ensure account exists before accessing its properties
          if (!account) {
            console.error("No account information provided");
            return false;
          }
          // Create new user for OAuth providers (no password)
          await User.create({
            name: user.name,
            email: user.email,
            provider: account.provider,
            // Password is not set for OAuth users
          });
        } else {
          // Update provider if different and account exists
          if (account && existingUser.provider !== account.provider) {
            existingUser.provider = account.provider;
            await existingUser.save();
          }
        }
        return true;
      } catch (error) {
        console.error("Sign-in callback error:", error);
        return false;
      }
    },
  },
});

export { handlers as GET, handlers as POST };