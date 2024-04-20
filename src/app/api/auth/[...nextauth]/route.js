import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import bcrypt from "bcrypt";
import connectToDB from "@/utils/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        try {
          const foundUser = await User.findOne({ email: credentials.email });

          if (foundUser) {
            const isPasswordCorrect = bcrypt.compareSync(
              credentials.password,
              foundUser.password
            );
            if (isPasswordCorrect) {
              return foundUser;
            }
          }
          console.log("Invalid credentials");
          return null;
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "google") {
        await connectToDB();

        try {
          const existingUser = await User.find({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });
            await newUser.save();
            return true;
          }
          return true;
        } catch (error) {
          console.log("Error Saving User:", error);
          return false;
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
