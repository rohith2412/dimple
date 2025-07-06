
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectdb from "../../../../database/connectdb"
import User from "../../../../models/userModal"

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        console.error("❌ No email found in Google profile");
        return false;
      }

      try {
        await connectdb();

        const existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
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

    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
      }

      await connectdb();

      const dbUser = await User.findOne({ email: token.email });

      if (
        dbUser?.createdAt &&
        dbUser.createdAt.getTime() === dbUser.updatedAt.getTime()
      ) {
        token.isNewUser = true;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email;
      }

      if (token.isNewUser) {
        session.user.isNewUser = true;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
