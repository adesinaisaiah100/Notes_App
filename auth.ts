import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

// import user from "@/models/user";
import User from "./models/user";
import { connectToDatabase } from "@/utils/database";

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET,
        })
  ],
  callbacks:{
        async session({session}){
            return session
        },

        async signIn({user,}){
            try {
                await connectToDatabase()
                const checkEmail=await User.find({email:user.email})
                
                if (checkEmail.length==0){
                    await User.insertMany({name:user.name,email:user.email})
                }
                return true
                
            } catch (e) {
                console.log(e)
                return false
            }
        }

    }
})

export {handlers as GET, handlers as POST}