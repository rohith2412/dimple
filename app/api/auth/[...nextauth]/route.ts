import connectdb from "@/database/connectdb";
import User from "@/models/userModal";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({profile}) {
            try {
                await connectdb();
                const exisitingUser = await User.findOne({email: profile?.email})
                if(!exisitingUser) {
                    await User.create({
                        name: profile?.name,
                        email: profile?.email,
                        image: profile?.image
                    })
                    console.log("saved to db")
                }
                return true;
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
})

export {handler as GET, handler as POST}