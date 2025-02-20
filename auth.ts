import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectToMongoDB } from "./lib/db";
import User from "./models/userModel";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        await connectToMongoDB();
        if (session.user) {
          const user = await User.findOne({ email: session.user.email });
          if (user) {
            session.user._id = user._id;
            return session;
          } else {
            throw new Error("User not found");
          }
        } else {
          throw new Error("Invalid session");
        }
      } catch (error) {
        console.log(error);
        throw new Error("Invalid session");
      }
    },
    async signIn({ account, profile }) {
      if (account?.provider === "github" || account?.provider === "google") {
        await connectToMongoDB();

        console.log("Profile----->", profile);

        try {
          const user = await User.findOne({ email: profile?.email });

          // signup the user if not found
          if (!user) {
            const newUser = await User.create({
              username: profile?.email,
              email: profile?.email,
              fullName: profile?.name,
              avatar: profile?.picture,
            });

            await newUser.save();
          }
          return true; // indicate successful sign-in
        } catch (error) {
          console.log(error);
          return false; // indicate failed sign-in
        }
      }

      return false; // indicate failed sign-in
    },
  },
});
