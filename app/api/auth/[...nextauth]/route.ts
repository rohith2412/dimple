import connectdb from "@/database/connectdb";
import User from "@/models/userModal";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isNewUser?: boolean;
    };
  }

  interface JWT {
    email?: string;
    isNewUser?: boolean;
  }
}

const authOptions: NextAuthOptions = {
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
            image: profile?.picture,
          });
          console.log("✅ New user created");
        } else {
          console.log("🔄 Existing user logged in");
        }

        return true;
      } catch (error) {
        console.error("❌ Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user, profile, account }) {
      if (user?.email) {
        token.email = user.email;
      }

      // Check in DB if user exists (used to detect first login)
      const dbUser = await User.findOne({ email: token.email });
      if (dbUser?.createdAt && dbUser.createdAt.getTime() === dbUser.updatedAt.getTime()) {
        token.isNewUser = true;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email as string;
      }

      // Pass custom new user flag
      if (token.isNewUser) {
        session.user.isNewUser = true;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
