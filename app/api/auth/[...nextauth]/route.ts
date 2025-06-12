import connectdb from "@/database/connectdb";
import User from "@/models/userModal";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Type augmentation directly in this file 👇
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string;
    };
  }

  interface User {
    id: string;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ profile }) {
      try {
        await connectdb();

        const existingUser = await User.findOne({ email: profile?.email });

        if (!existingUser) {
          await User.create({
            name: profile?.name,
            email: profile?.email,
            image: profile?.image,
          });
          console.log("Saved to DB");
        }

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await User.findOne({ email: user.email });
        token.id = dbUser?._id.toString();
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // ✅ No red squiggle now
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
