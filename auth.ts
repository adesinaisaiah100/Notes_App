import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";

const GITHUB_ID = process.env.GITHUB_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;
const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

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
        console.log("Sign-in attempt:", { user, account }); // Debugging
        await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          if (!account) {
            console.error("No account information provided");
            return false;
          }
          await User.create({
            name: user.name,
            email: user.email,
            provider: account.provider, // Fixed: Use string value
            password: undefined, // Explicitly set for OAuth users
          });
        } else {
          if (account && existingUser.provider !== account.provider) {
            existingUser.provider = account.provider;
            await existingUser.save();
          }
        }
        return true;
      } catch (error) {
        console.error("Sign-in callback error:", error, { user, account });
        return false;
      }
    },
  },
});

export { handlers as GET, handlers as POST };